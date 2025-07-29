// Calendar client utilities
export { createCalendarClient } from "./calendar-client";

// Event fetching utilities
export {
  fetchEvents,
  fetchEventsFromMultipleCalendars,
  filterTimedEvents,
} from "./event-fetcher";

// Timezone utilities
export {
  getUserTimezone,
  createTimeRange,
  formatDateInTimezone,
  formatTimeInTimezone,
} from "./timezone-utils";

// Date utilities
export {
  getTodayDate,
  addDaysToDate,
  applyDateDefaults,
  doRangesOverlap,
  minutesToMs,
  msToMinutes,
} from "./date-utils";

// Types
export type {
  CalendarEvent,
  Calendar,
  EventAttendee,
  EventDateTime,
  EventReminder,
  TimeSlot,
  ConflictingEvent,
  SearchPeriod,
  AvailabilityResult,
  FindAvailabilityParams,
  EventFetchParams,
  CalendarClientConfig,
} from "./types";
