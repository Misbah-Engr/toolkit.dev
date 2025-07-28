import type { calendar_v3 } from "googleapis";

// Re-export SDK types for convenience
export type CalendarEvent = calendar_v3.Schema$Event;
export type Calendar = calendar_v3.Schema$CalendarListEntry;
export type EventAttendee = calendar_v3.Schema$EventAttendee;
export type EventDateTime = calendar_v3.Schema$EventDateTime;
export type EventReminder = calendar_v3.Schema$EventReminder;

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