import type { Client } from "@notionhq/client";
import type { calendar_v3 } from "googleapis";
import { 
  getUserTimezone, 
  createTimeRange, 
  applyDateDefaults,
  fetchEventsFromMultipleCalendars,
  filterTimedEvents
} from "../../../lib";
import type { 
  FindAvailabilityParams, 
  AvailabilityResult
} from "../../../lib/types";
import { generateTimeSlots } from "./slot-generator";
import { filterConflictingSlots, extractConflictingEvents } from "./conflict-detector";
import { resolveAttendeeEmails } from "./attendee-resolver";

/**
 * Analyzes calendar availability for a given time period
 * @param params - Availability analysis parameters
 * @param calendar - Google Calendar client
 * @param notion - Optional Notion client for attendee resolution
 * @returns Availability analysis result
 */
export const analyzeAvailability = async (
  params: FindAvailabilityParams,
  calendar: calendar_v3.Calendar,
  notion?: Client
): Promise<AvailabilityResult> => {
  // Apply intelligent defaults based on user intent
  const { searchStartDate, searchEndDate } = applyDateDefaults(params.startDate, params.endDate);
  const searchDuration = params.durationMinutes ?? 60; // Default 60 minutes for meetings
  const searchMaxResults = params.maxResults ?? 10; // Default 10 results
  
  // Apply time constraints with defaults
  const startTime = params.startTime ?? "09:00"; // Default 9 AM
  const endTime = params.endTime ?? "17:00"; // Default 5 PM
  
  // If no attendees specified, that's fine - just check user's calendar
  const attendeeNames = params.attendeeNames ?? [];

  const userTimeZone = await getUserTimezone(calendar);

  // Create time range
  const { timeMin, timeMax } = createTimeRange(searchStartDate, searchEndDate);
  const startDateObj = new Date(timeMin);
  const endDateObj = new Date(timeMax);

  // Fetch events from primary calendar
  const primaryEvents = await fetchEventsFromMultipleCalendars(
    calendar,
    ["primary"],
    {
      timeMin,
      timeMax,
      maxResults: 2500,
      orderBy: "startTime",
      singleEvents: true,
      timeZone: userTimeZone
    }
  );

  const primaryEventsFiltered = filterTimedEvents(primaryEvents);
  
  // If attendees are specified, get their events
  let allEvents = [...primaryEventsFiltered];
  if (attendeeNames.length > 0 && notion) {
    const attendeeEmails = await resolveAttendeeEmails(notion, attendeeNames);
    
    if (attendeeEmails.length > 0) {
      const attendeeEvents = await fetchEventsFromMultipleCalendars(
        calendar,
        attendeeEmails,
        {
          timeMin,
          timeMax,
          maxResults: 2500,
          orderBy: "startTime",
          singleEvents: true,
        }
      );
      
      allEvents = [...allEvents, ...filterTimedEvents(attendeeEvents)];
    }
  }

  // Generate all possible time slots
  const allSlots = generateTimeSlots(
    startDateObj,
    endDateObj,
    searchDuration,
    userTimeZone,
    searchMaxResults * 10, // Generate more slots than needed to account for conflicts
    startTime,
    endTime
  );

  // Filter out conflicting slots
  const availableSlots = filterConflictingSlots(allSlots, allEvents).slice(0, searchMaxResults);

  // Extract conflicting events for the search period
  const conflictingEvents = extractConflictingEvents(allEvents, startDateObj, endDateObj);

  return {
    availableSlots,
    totalSlotsFound: availableSlots.length,
    searchPeriod: {
      start: timeMin,
      end: timeMax,
      duration: searchDuration,
    },
    conflictingEvents,
  };
}; 