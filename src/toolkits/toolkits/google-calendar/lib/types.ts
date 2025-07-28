import type { calendar_v3 } from "googleapis";

/**
 * Common event structure used across Google Calendar tools
 */
export interface CalendarEvent {
  id: string;
  summary?: string;
  description?: string;
  location?: string;
  start: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  status?: string;
  visibility?: string;
  organizer?: {
    email?: string;
    displayName?: string;
  };
  attendees?: Array<{
    email?: string;
    displayName?: string;
    responseStatus?: string;
    optional?: boolean;
  }>;
  recurringEventId?: string;
  created?: string;
  updated?: string;
  htmlLink?: string;
}

/**
 * Common calendar structure used across Google Calendar tools
 */
export interface Calendar {
  id: string;
  summary: string;
  description?: string;
  timeZone: string;
  colorId?: string;
  backgroundColor?: string;
  foregroundColor?: string;
  selected?: boolean;
  accessRole: string;
  primary?: boolean;
  location?: string;
}

/**
 * Time slot structure for availability analysis
 */
export interface TimeSlot {
  start: string;
  end: string;
  duration: number;
  dayOfWeek: string;
  date: string;
  timeRange: string;
}

/**
 * Conflicting event structure for availability analysis
 */
export interface ConflictingEvent {
  id: string;
  summary?: string;
  start: string;
  end: string;
}

/**
 * Search period information
 */
export interface SearchPeriod {
  start: string;
  end: string;
  duration: number;
}

/**
 * Availability analysis result
 */
export interface AvailabilityResult {
  availableSlots: TimeSlot[];
  totalSlotsFound: number;
  searchPeriod: SearchPeriod;
  conflictingEvents: ConflictingEvent[];
}

/**
 * Parameters for finding availability
 */
export interface FindAvailabilityParams {
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  durationMinutes?: number;
  attendeeNames?: string[];
  maxResults?: number;
}

/**
 * Event fetching parameters
 */
export interface EventFetchParams {
  calendarId: string;
  timeMin?: string;
  timeMax?: string;
  maxResults?: number;
  pageToken?: string;
  orderBy?: string;
  singleEvents?: boolean;
  timeZone?: string;
}

/**
 * Calendar client configuration
 */
export interface CalendarClientConfig {
  accessToken: string;
  timezone?: string;
} 