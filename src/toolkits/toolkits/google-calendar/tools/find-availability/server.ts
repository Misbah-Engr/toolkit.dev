import { type findAvailabilityTool } from "./base";
import { google } from "googleapis";
import type { ServerToolConfig } from "@/toolkits/types";
import { notionListUsersToolConfigServer } from "../../../notion/tools/users/server";
import type { UserObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const googleCalendarFindAvailabilityToolConfigServer = (
  accessToken: string,
  notion: any, // TODO: Type this properly
): ServerToolConfig<
  typeof findAvailabilityTool.inputSchema.shape,
  typeof findAvailabilityTool.outputSchema.shape
> => {
  return {
    callback: async ({
      startDate,
      endDate,
      durationMinutes,
      attendeeNames,
    }) => {
      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });

      const calendar = google.calendar({ version: "v3", auth });

      // Convert date strings to RFC3339 timestamps
      const timeMin = `${startDate}T00:00:00Z`;
      const timeMax = `${endDate}T23:59:59Z`;

      // Fetch existing events in the time range
      const response = await calendar.events.list({
        calendarId: "primary", // Use primary calendar by default
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

      // If attendees are specified, get their emails from Notion and check their calendars
      if (attendeeNames && attendeeNames.length > 0) {
        // Fetch all Notion users
        const notionUsers = await notionListUsersToolConfigServer(notion).callback({
          start_cursor: "",
          page_size: 100,
        });

        // Map names to emails
        const nameToEmail = new Map(
          notionUsers.results.map((user: UserObjectResponse) => {
            if (user.type === "person") {
              return [user.name?.toLowerCase() ?? "", user.person?.email ?? ""];
            }
            return [user.name?.toLowerCase() ?? "", ""];
          })
        );

        // Get attendee emails
        const attendeeEmails = attendeeNames
          .map(name => nameToEmail.get(name.toLowerCase()))
          .filter((email): email is string => !!email);

        // Check each attendee's calendar
        for (const email of attendeeEmails) {
          try {
            const attendeeResponse = await calendar.events.list({
              calendarId: email,
              timeMin,
              timeMax,
              singleEvents: true,
              orderBy: "startTime",
              maxResults: 2500,
            });
            
            const attendeeEvents = attendeeResponse.data.items ?? [];
            const attendeeTimedEvents = attendeeEvents.filter(event => 
              event.start?.dateTime && event.end?.dateTime
            );
            
            timedEvents.push(...attendeeTimedEvents);
          } catch (error) {
            console.error(`Failed to fetch calendar for ${email}:`, error);
          }
        }
      }

      // Use sensible defaults for working hours
      const workingHours = {
        startTime: "09:00",
        endTime: "17:00",
        workingDays: [1, 2, 3, 4, 5], // Mon-Fri
      };

      const gapMinutes = 15; // 15 minute buffer between meetings
      const maxSlots = 10; // Return up to 10 available slots

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
      
      const startDateObj = new Date(timeMin);
      const endDateObj = new Date(timeMax);
      
      // Iterate through each day
      const currentDate = new Date(startDateObj);
      
      while (currentDate <= endDateObj && availableSlots.length < maxSlots) {
        const dayOfWeek = currentDate.getDay();
        
        // Skip non-working days
        if (!workingHours.workingDays.includes(dayOfWeek)) {
          currentDate.setDate(currentDate.getDate() + 1);
          continue;
        }

        // Set working hours for this day
        const dayStart = new Date(currentDate);
        const [startHour, startMin] = workingHours.startTime.split(':').map(Number);
        dayStart.setHours(startHour ?? 9, startMin ?? 0, 0, 0);
        
        const dayEnd = new Date(currentDate);
        const [endHour, endMin] = workingHours.endTime.split(':').map(Number);
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
          
          if (availableMinutes >= durationMinutes) {
            const slotEnd = new Date(currentSlotStart.getTime() + durationMinutes * 60 * 1000);
            
            availableSlots.push({
              start: currentSlotStart.toISOString(),
              end: slotEnd.toISOString(),
              duration: durationMinutes,
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
          if (availableMinutes >= durationMinutes) {
            const slotEnd = new Date(currentSlotStart.getTime() + durationMinutes * 60 * 1000);
            
            if (slotEnd <= dayEnd) {
              availableSlots.push({
                start: currentSlotStart.toISOString(),
                end: slotEnd.toISOString(),
                duration: durationMinutes,
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
          duration: durationMinutes,
        },
        conflictingEvents,
      };
    },
  };
}; 