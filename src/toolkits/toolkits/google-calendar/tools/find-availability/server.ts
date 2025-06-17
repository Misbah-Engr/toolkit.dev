import { type findAvailabilityTool } from "./base";
import { google } from "googleapis";
import type { ServerToolConfig } from "@/toolkits/types";

export const googleCalendarFindAvailabilityToolConfigServer = (
  accessToken: string,
): ServerToolConfig<
  typeof findAvailabilityTool.inputSchema.shape,
  typeof findAvailabilityTool.outputSchema.shape
> => {
  return {
    callback: async ({
      calendarId,
      timeMin,
      timeMax,
      duration,
      workingHours,
      minGapBetweenEvents,
      maxResults,
    }) => {
      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });

      const calendar = google.calendar({ version: "v3", auth });

      // Fetch existing events in the time range
      const response = await calendar.events.list({
        calendarId,
        timeMin,
        timeMax,
        singleEvents: true,
        orderBy: "startTime",
        maxResults: 2500, // Get all events in the range
      });

      const events = response.data.items ?? [];
      
      // Filter events that actually have start/end times (not all-day events without times)
      const timedEvents = events.filter(event => 
        event.start?.dateTime && event.end?.dateTime
      );

      // Set default working hours if not provided
      const defaultWorkingHours = {
        startTime: workingHours?.startTime ?? "09:00",
        endTime: workingHours?.endTime ?? "17:00",
        workingDays: workingHours?.workingDays ?? [1, 2, 3, 4, 5], // Mon-Fri
      };

      const gapMinutes = minGapBetweenEvents ?? 15;
      const maxSlots = maxResults ?? 10;

      // Find available slots
      const availableSlots: Array<{
        start: string;
        end: string;
        duration: number;
        dayOfWeek: string;
        date: string;
        timeRange: string;
      }> = [];
      const conflictingEvents: Array<{
        id: string;
        summary?: string;
        start: string;
        end: string;
      }> = [];
      
      const startDate = new Date(timeMin);
      const endDate = new Date(timeMax);
      
      // Iterate through each day
      const currentDate = new Date(startDate);
      
      while (currentDate <= endDate && availableSlots.length < maxSlots) {
        const dayOfWeek = currentDate.getDay();
        
        // Skip non-working days
        if (!defaultWorkingHours.workingDays.includes(dayOfWeek)) {
          currentDate.setDate(currentDate.getDate() + 1);
          continue;
        }

        // Set working hours for this day
        const dayStart = new Date(currentDate);
        const [startHour, startMin] = defaultWorkingHours.startTime.split(':').map(Number);
        dayStart.setHours(startHour ?? 9, startMin ?? 0, 0, 0);
        
        const dayEnd = new Date(currentDate);
        const [endHour, endMin] = defaultWorkingHours.endTime.split(':').map(Number);
        dayEnd.setHours(endHour ?? 17, endMin ?? 0, 0, 0);

        // Get events for this day
        const dayEvents = timedEvents.filter(event => {
          const eventStart = new Date(event.start!.dateTime!);
          const eventEnd = new Date(event.end!.dateTime!);
          return (eventStart >= dayStart && eventStart <= dayEnd) || 
                 (eventEnd >= dayStart && eventEnd <= dayEnd) ||
                 (eventStart <= dayStart && eventEnd >= dayEnd);
        });

        // Sort events by start time
        dayEvents.sort((a, b) => 
          new Date(a.start!.dateTime!).getTime() - new Date(b.start!.dateTime!).getTime()
        );

        // Add conflicting events
        dayEvents.forEach(event => {
          conflictingEvents.push({
            id: event.id!,
            summary: event.summary ?? undefined,
            start: event.start!.dateTime!,
            end: event.end!.dateTime!,
          });
        });

        // Find gaps between events
        let currentSlotStart = dayStart;
        
        for (const event of dayEvents) {
          const eventStart = new Date(event.start!.dateTime!);
          const eventEnd = new Date(event.end!.dateTime!);
          
          // Check if there's a gap before this event
          const gapEnd = new Date(eventStart.getTime() - gapMinutes * 60 * 1000);
          const availableMinutes = (gapEnd.getTime() - currentSlotStart.getTime()) / (1000 * 60);
          
          if (availableMinutes >= duration) {
            const slotEnd = new Date(currentSlotStart.getTime() + duration * 60 * 1000);
            
            availableSlots.push({
              start: currentSlotStart.toISOString(),
              end: slotEnd.toISOString(),
              duration,
              dayOfWeek: currentSlotStart.toLocaleDateString('en-US', { weekday: 'long' }),
              date: currentSlotStart.toISOString().split('T')[0]!,
              timeRange: `${currentSlotStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${slotEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            });
            
            if (availableSlots.length >= maxSlots) break;
          }
          
          // Move to after this event (with gap)
          currentSlotStart = new Date(eventEnd.getTime() + gapMinutes * 60 * 1000);
        }
        
        // Check for gap after the last event until end of day
        if (availableSlots.length < maxSlots) {
          const availableMinutes = (dayEnd.getTime() - currentSlotStart.getTime()) / (1000 * 60);
          if (availableMinutes >= duration) {
            const slotEnd = new Date(currentSlotStart.getTime() + duration * 60 * 1000);
            
            if (slotEnd <= dayEnd) {
              availableSlots.push({
                start: currentSlotStart.toISOString(),
                end: slotEnd.toISOString(),
                duration,
                dayOfWeek: currentSlotStart.toLocaleDateString('en-US', { weekday: 'long' }),
                date: currentSlotStart.toISOString().split('T')[0]!,
                timeRange: `${currentSlotStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${slotEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
              });
            }
          }
        }
        
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return {
        availableSlots,
        totalSlotsFound: availableSlots.length,
        searchPeriod: {
          start: timeMin,
          end: timeMax,
          duration,
        },
        conflictingEvents,
      };
    },
  };
}; 