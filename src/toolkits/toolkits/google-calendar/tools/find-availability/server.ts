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
    message:
      "The user is shown available time slots in an organized grid. Give a brief summary of the availability found and ask if they would like to schedule a meeting for any of the suggested times.",
    callback: async ({
      startDate,
      endDate,
      durationMinutes,
      attendeeNames,
      maxResults,
    }) => {
      if (!accessToken) {
        throw new Error("Google Calendar access token is not available");
      }

      // Apply intelligent defaults following the || pattern from other toolkits
      const today = new Date().toISOString().split('T')[0];
      const searchStartDate = startDate || today;
      const searchEndDate = endDate || (() => {
        const defaultEnd = new Date(searchStartDate!);
        defaultEnd.setDate(defaultEnd.getDate() + 7);
        return defaultEnd.toISOString().split('T')[0];
      })();
      const searchDuration = durationMinutes || 60;
      const searchMaxResults = maxResults || 10;

      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });

      const calendar = google.calendar({ version: "v3", auth });

      // Get user's primary calendar timezone
      let userTimeZone = 'America/New_York'; // fallback
      try {
        const calendarResponse = await calendar.calendars.get({
          calendarId: 'primary'
        });
        userTimeZone = calendarResponse.data.timeZone || userTimeZone;
      } catch (error) {
        // Using fallback timezone
      }

      // Create proper RFC3339 timestamps for the search range
      const startOfDay = new Date(`${searchStartDate}T00:00:00`);
      const endOfDay = new Date(`${searchEndDate}T23:59:59`);
      
      const timeMin = startOfDay.toISOString();
      const timeMax = endOfDay.toISOString();

      // Fetch existing events in the time range
      try {
        const response = await calendar.events.list({
          calendarId: "primary",
          timeMin,
          timeMax,
          singleEvents: true,
          orderBy: "startTime",
          maxResults: 2500,
          timeZone: userTimeZone
        });

        const events = response.data.items ?? [];
        const timedEvents = events.filter(event => 
          event.start?.dateTime && event.end?.dateTime
        );

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
              // Failed to fetch calendar for attendee
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

        // Generate slots across the entire day (24 hours)
        const startDateObj = new Date(timeMin);
        const endDateObj = new Date(timeMax);
        const currentDate = new Date(startDateObj);
        
        while (currentDate <= endDateObj && availableSlots.length < searchMaxResults) {
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth();
          const date = currentDate.getDate();
          
          // Full day: 12 AM - 11:59 PM
          const dayStart = new Date(year, month, date, 0, 0, 0, 0);
          const dayEnd = new Date(year, month, date, 23, 59, 59, 999);

          // Get events for this day
          const dayEvents = timedEvents.filter(event => {
            const eventStart = new Date(event.start!.dateTime!);
            const eventEnd = new Date(event.end!.dateTime!);
            return (eventStart < dayEnd && eventEnd > dayStart);
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
          let currentSlotStart = new Date(dayStart);
          
          while (currentSlotStart.getTime() + (searchDuration * 60 * 1000) <= dayEnd.getTime()) {
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
                dayOfWeek: currentSlotStart.toLocaleDateString('en-US', { weekday: 'long', timeZone: userTimeZone }),
                date: currentSlotStart.toLocaleDateString('en-US', { timeZone: userTimeZone }),
                timeRange: `${currentSlotStart.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  timeZone: userTimeZone,
                  hour12: true 
                })} - ${slotEnd.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  timeZone: userTimeZone,
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
      } catch (error) {
        throw new Error("Failed to analyze calendar availability");
      }
    },
  };
}; 