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
    timeMin: params.timeMin || undefined,
    timeMax: params.timeMax || undefined,
    maxResults: params.maxResults || 2500,
    pageToken: params.pageToken || undefined,
    orderBy: params.orderBy 
      ? (params.orderBy as "startTime" | "updated") 
      : "updated",
    singleEvents: params.singleEvents ?? true,
    timeZone: params.timeZone || undefined,
  });

  const events = (response.data.items ?? []).map((event): CalendarEvent => ({
    id: event.id!,
    summary: event.summary ?? undefined,
    description: event.description ?? undefined,
    location: event.location ?? undefined,
    start: {
      dateTime: event.start?.dateTime ?? undefined,
      date: event.start?.date ?? undefined,
      timeZone: event.start?.timeZone ?? undefined,
    },
    end: {
      dateTime: event.end?.dateTime ?? undefined,
      date: event.end?.date ?? undefined,
      timeZone: event.end?.timeZone ?? undefined,
    },
    status: event.status ?? undefined,
    visibility: event.visibility ?? undefined,
    organizer: event.organizer
      ? {
          email: event.organizer.email ?? undefined,
          displayName: event.organizer.displayName ?? undefined,
        }
      : undefined,
    attendees: event.attendees?.map((attendee) => ({
      email: attendee.email ?? undefined,
      displayName: attendee.displayName ?? undefined,
      responseStatus: attendee.responseStatus ?? undefined,
      optional: attendee.optional ?? undefined,
    })),
    recurringEventId: event.recurringEventId ?? undefined,
    created: event.created ?? undefined,
    updated: event.updated ?? undefined,
    htmlLink: event.htmlLink ?? undefined,
  }));

  return {
    events,
    nextPageToken: response.data.nextPageToken ?? undefined,
    timeZone: response.data.timeZone ?? undefined,
  };
};

/**
 * Fetches events from multiple calendars
 * @param calendar - The Google Calendar client
 * @param calendarIds - Array of calendar IDs to fetch from
 * @param params - Event fetching parameters
 * @returns Array of calendar events from all calendars
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
      // Failed to fetch calendar for this calendar ID
      // Continue with other calendars
    }
  }
  
  return allEvents;
};

/**
 * Filters events to only include timed events (events with start and end times)
 * @param events - Array of calendar events
 * @returns Array of timed events only
 */
export const filterTimedEvents = (events: CalendarEvent[]): CalendarEvent[] => {
  return events.filter(event => 
    event.start.dateTime && event.end.dateTime
  );
}; 