import { formatDateInTimezone, formatTimeInTimezone } from "../../../lib";
import type { TimeSlot } from "../../../lib/types";

/**
 * Generates time slots for a given date range and duration
 * @param startDate - Start date for slot generation
 * @param endDate - End date for slot generation
 * @param durationMinutes - Duration of each slot in minutes
 * @param timezone - Timezone for formatting
 * @param maxResults - Maximum number of slots to generate
 * @param startTime - Start time for daily search (HH:MM format, 24-hour)
 * @param endTime - End time for daily search (HH:MM format, 24-hour)
 * @returns Array of time slots
 */
export const generateTimeSlots = (
  startDate: Date,
  endDate: Date,
  durationMinutes: number,
  timezone: string,
  maxResults: number,
  startTime: string = "09:00",
  endTime: string = "17:00"
): TimeSlot[] => {
  const availableSlots: TimeSlot[] = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate && availableSlots.length < maxResults) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = currentDate.getDate();
    
    // Parse time constraints
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    // Use specified time range instead of full day
    const dayStart = new Date(year, month, date, startHour, startMinute, 0, 0);
    const dayEnd = new Date(year, month, date, endHour, endMinute, 0, 0);

    // Generate time slots every hour within the specified range
    let currentSlotStart = new Date(dayStart);
    
    while (currentSlotStart.getTime() + (durationMinutes * 60 * 1000) <= dayEnd.getTime()) {
      const slotEnd = new Date(currentSlotStart.getTime() + (durationMinutes * 60 * 1000));
      
      availableSlots.push({
        start: currentSlotStart.toISOString(),
        end: slotEnd.toISOString(),
        duration: durationMinutes,
        dayOfWeek: formatDateInTimezone(currentSlotStart, timezone, { weekday: 'long' }),
        date: formatDateInTimezone(currentSlotStart, timezone),
        timeRange: `${formatTimeInTimezone(currentSlotStart, timezone, { 
          hour: '2-digit', 
          minute: '2-digit'
        })} - ${formatTimeInTimezone(slotEnd, timezone, { 
          hour: '2-digit', 
          minute: '2-digit'
        })}`,
      });
      
      if (availableSlots.length >= maxResults) break;
      
      // Move to next hour
      currentSlotStart = new Date(currentSlotStart.getTime() + (60 * 60 * 1000));
    }
    
    if (availableSlots.length >= maxResults) break;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return availableSlots;
}; 