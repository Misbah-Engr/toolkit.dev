import type { calendar_v3 } from "googleapis";
import type { CalendarEvent, EventFetchParams } from "./types";

/**
 * Fetches events from a Google Calendar with the specified parameters
 * @param calendar - The Google Calendar client
 * @param params - Event fetching parameters
 * @returns Object with events array and pagination info
 */
export const fetchEvents = async (
  calendar: calendar_v3.Calendar,
  params: EventFetchParams
): Promise<{ events: CalendarEvent[]; nextPageToken?: string; timeZone?: string }> => {
  const response = await calendar.events.list({
    calendarId: params.calendarId,
    timeMin: params.timeMin ?? undefined,
    timeMax: params.timeMax ?? undefined,
    maxResults: params.maxResults ?? 2500,
    pageToken: params.pageToken ?? undefined,
    orderBy: params.orderBy 
      ? (params.orderBy as "startTime" | "updated") 
      : "updated",
    singleEvents: params.singleEvents ?? true,
    timeZone: params.timeZone ?? undefined,
  });

  return {
    events: response.data.items ?? [],
    nextPageToken: response.data.nextPageToken ?? undefined,
    timeZone: response.data.timeZone ?? undefined,
  };
};

/**
 * Fetches events from multiple calendars
 * @param calendar - The Google Calendar client
 * @param calendarIds - Array of calendar IDs to fetch from
 * @param params - Event fetching parameters
 * @returns Array of events from all calendars
 */
export const fetchEventsFromMultipleCalendars = async (
  calendar: calendar_v3.Calendar,
  calendarIds: string[],
  params: Omit<EventFetchParams, 'calendarId'>
): Promise<CalendarEvent[]> => {
  const allEvents: CalendarEvent[] = [];
  
  for (const calendarId of calendarIds) {
    try {
      const result = await fetchEvents(calendar, {
        ...params,
        calendarId,
      });
      allEvents.push(...result.events);
    } catch (error) {
      console.warn(`Failed to fetch events from calendar ${calendarId}:`, error);
    }
  }
  
  return allEvents;
};

/**
 * Filters events to only include timed events (not all-day events)
 * @param events - Array of calendar events
 * @returns Array of timed events only
 */
export const filterTimedEvents = (events: CalendarEvent[]): CalendarEvent[] => {
  return events.filter(event => {
    // Check if the event has a start time with dateTime (timed event)
    return event.start?.dateTime && !event.start?.date;
  });
}; 