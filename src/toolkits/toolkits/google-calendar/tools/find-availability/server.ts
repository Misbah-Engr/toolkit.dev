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
    message: (result) => {
      if (result.conflictingEvents.length > 0) {
        return `Found ${result.totalSlotsFound} available slots between ${result.searchPeriod.start} and ${result.searchPeriod.end}. There are ${result.conflictingEvents.length} conflicting events during this period.`;
      } else if (result.totalSlotsFound > 0) {
        return `Found ${result.totalSlotsFound} available slots between ${result.searchPeriod.start} and ${result.searchPeriod.end}.`;
      } else {
        return `No available slots found between ${result.searchPeriod.start} and ${result.searchPeriod.end}.`;
      }
    },
    callback: async ({
      startDate,
      endDate,
      durationMinutes,
      timeOfDay,
      workingHours,
      attendeeNames,
      maxResults,
    }) => {
      // Apply intelligent defaults following the || pattern from other toolkits
      const today = new Date().toISOString().split('T')[0];
      const searchStartDate = startDate || today;
      const searchEndDate = endDate || (() => {
        const defaultEnd = new Date(searchStartDate!);
        defaultEnd.setDate(defaultEnd.getDate() + 7);
        return defaultEnd.toISOString().split('T')[0];
      })();
      const searchDuration = durationMinutes || 60;
      const searchTimeOfDay = timeOfDay || 'any';
      const searchMaxResults = maxResults || 10;
      
      // Working hours with sensible defaults
      const defaultWorkingHours = {
        start: "09:00",
        end: "17:00",
      };
      const searchWorkingHours = {
        start: workingHours?.start || defaultWorkingHours.start,
        end: workingHours?.end || defaultWorkingHours.end,
      };

      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });

      const calendar = google.calendar({ version: "v3", auth });

      // Convert date strings to RFC3339 timestamps with timezone
      const timeMin = `${searchStartDate}T00:00:00-04:00`;
      const timeMax = `${searchEndDate}T23:59:59-04:00`;

      console.log('[FindAvailability] Search parameters:', {
        startDate: searchStartDate,
        endDate: searchEndDate,
        duration: searchDuration,
        timeOfDay: searchTimeOfDay,
        workingHours: searchWorkingHours,
        maxResults: searchMaxResults
      });

      // Fetch existing events in the time range
      const response = await calendar.events.list({
        calendarId: "primary",
        timeMin,
        timeMax,
        singleEvents: true,
        orderBy: "startTime",
        maxResults: 2500,
        timeZone: 'America/New_York'
      });

      const events = response.data.items ?? [];
      const timedEvents = events.filter(event => 
        event.start?.dateTime && event.end?.dateTime
      );

      console.log('[FindAvailability] Found events:', {
        total: events.length,
        timed: timedEvents.length
      });

      // If attendees are specified, get their emails from Notion and check their calendars
      if (attendeeNames && attendeeNames.length > 0) {
        const notionUsers = await notionListUsersToolConfigServer(notion).callback({
          start_cursor: "",
          page_size: 100,
        });

        const nameToEmail = new Map(
          notionUsers.results.map((user: UserObjectResponse) => {
            if (user.type === "person") {
              return [user.name?.toLowerCase() ?? "", user.person?.email ?? ""];
            }
            return [user.name?.toLowerCase() ?? "", ""];
          })
        );

        const attendeeEmails = attendeeNames
          .map(name => nameToEmail.get(name.toLowerCase()))
          .filter((email): email is string => !!email);

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

      // Generate slots based on working hours and time preferences
      const startDateObj = new Date(timeMin);
      const endDateObj = new Date(timeMax);
      const currentDate = new Date(startDateObj);
      
      while (currentDate <= endDateObj && availableSlots.length < searchMaxResults) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = currentDate.getDate();
        
        // Set working hours for this day
        const [startHour, startMin] = searchWorkingHours.start.split(':').map(Number);
        const [endHour, endMin] = searchWorkingHours.end.split(':').map(Number);
        
        const dayStart = new Date(year, month, date, startHour ?? 9, startMin ?? 0, 0, 0);
        const dayEnd = new Date(year, month, date, endHour ?? 17, endMin ?? 0, 0, 0);

        // Apply time of day filter
        let searchStart = dayStart;
        let searchEnd = dayEnd;
        
        if (searchTimeOfDay === 'morning') {
          searchEnd = new Date(year, month, date, 12, 0, 0, 0); // End at noon
        } else if (searchTimeOfDay === 'afternoon') {
          searchStart = new Date(year, month, date, 12, 0, 0, 0); // Start at noon
          searchEnd = new Date(year, month, date, 17, 0, 0, 0); // End at 5 PM
        } else if (searchTimeOfDay === 'evening') {
          searchStart = new Date(year, month, date, 17, 0, 0, 0); // Start at 5 PM
          searchEnd = new Date(year, month, date, 21, 0, 0, 0); // End at 9 PM
        }

        // Get events for this day
        const dayEvents = timedEvents.filter(event => {
          const eventStart = new Date(event.start!.dateTime!);
          const eventEnd = new Date(event.end!.dateTime!);
          return (eventStart < searchEnd && eventEnd > searchStart);
        });

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

        // Generate time slots every hour
        let currentSlotStart = new Date(searchStart);
        
        while (currentSlotStart.getTime() + (searchDuration * 60 * 1000) <= searchEnd.getTime()) {
          const slotEnd = new Date(currentSlotStart.getTime() + (searchDuration * 60 * 1000));
          
          // Check if this slot conflicts with any existing events
          const hasConflict = dayEvents.some(event => {
            const eventStart = new Date(event.start!.dateTime!);
            const eventEnd = new Date(event.end!.dateTime!);
            return (currentSlotStart < eventEnd && slotEnd > eventStart);
          });
          
          if (!hasConflict) {
            availableSlots.push({
              start: currentSlotStart.toISOString(),
              end: slotEnd.toISOString(),
              duration: searchDuration,
              dayOfWeek: currentSlotStart.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'America/New_York' }),
              date: currentSlotStart.toLocaleDateString('en-US', { timeZone: 'America/New_York' }),
              timeRange: `${currentSlotStart.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                timeZone: 'America/New_York',
                hour12: true 
              })} - ${slotEnd.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                timeZone: 'America/New_York',
                hour12: true 
              })}`,
            });
            
            if (availableSlots.length >= searchMaxResults) break;
          }
          
          // Move to next hour
          currentSlotStart = new Date(currentSlotStart.getTime() + (60 * 60 * 1000));
        }
        
        if (availableSlots.length >= searchMaxResults) break;
        currentDate.setDate(currentDate.getDate() + 1);
      }

      console.log('[FindAvailability] Results:', {
        availableSlots: availableSlots.length,
        conflictingEvents: conflictingEvents.length
      });

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
    },
  };
}; 