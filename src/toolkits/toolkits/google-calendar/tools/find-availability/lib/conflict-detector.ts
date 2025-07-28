import { doRangesOverlap } from "../../../lib";
import type { CalendarEvent, TimeSlot, ConflictingEvent } from "../../../lib/types";

/**
 * Checks if a time slot conflicts with any existing events
 * @param slot - The time slot to check
 * @param events - Array of existing events
 * @returns True if there's a conflict
 */
export const hasConflict = (slot: TimeSlot, events: CalendarEvent[]): boolean => {
  const slotStart = new Date(slot.start);
  const slotEnd = new Date(slot.end);
  
  return events.some(event => {
    if (!event.start.dateTime || !event.end.dateTime) return false;
    
    const eventStart = new Date(event.start.dateTime);
    const eventEnd = new Date(event.end.dateTime);
    
    return doRangesOverlap(slotStart, slotEnd, eventStart, eventEnd);
  });
};

/**
 * Filters out conflicting slots from a list of available slots
 * @param slots - Array of available time slots
 * @param events - Array of existing events
 * @returns Array of non-conflicting slots
 */
export const filterConflictingSlots = (
  slots: TimeSlot[],
  events: CalendarEvent[]
): TimeSlot[] => {
  return slots.filter(slot => !hasConflict(slot, events));
};

/**
 * Extracts conflicting events for a given time range
 * @param events - Array of all events
 * @param startDate - Start of time range
 * @param endDate - End of time range
 * @returns Array of conflicting events
 */
export const extractConflictingEvents = (
  events: CalendarEvent[],
  startDate: Date,
  endDate: Date
): ConflictingEvent[] => {
  return events
    .filter(event => {
      if (!event.start.dateTime || !event.end.dateTime) return false;
      
      const eventStart = new Date(event.start.dateTime);
      const eventEnd = new Date(event.end.dateTime);
      
      return doRangesOverlap(startDate, endDate, eventStart, eventEnd);
    })
    .map(event => ({
      id: event.id,
      summary: event.summary,
      start: event.start.dateTime!,
      end: event.end.dateTime!,
    }));
}; 