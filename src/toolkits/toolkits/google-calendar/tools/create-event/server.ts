import { type createEventTool } from "./base";
import type { ServerToolConfig } from "@/toolkits/types";
import type { calendar_v3 } from "googleapis";
import { createCalendarClient, getUserTimezone } from "../../lib";

export const googleCalendarCreateEventToolConfigServer = (
  accessToken: string,
): ServerToolConfig<
  typeof createEventTool.inputSchema.shape,
  typeof createEventTool.outputSchema.shape
> => {
  return {
    callback: async ({
      title,
      startDateTime,
      endDateTime,
    }) => {
      if (!accessToken) {
        throw new Error("Google Calendar access token is not available");
      }

      console.log('[CreateEvent] Creating event with parameters:', {
        title,
        startDateTime,
        endDateTime
      });

      const calendar = createCalendarClient(accessToken);

      // Get user's primary calendar timezone
      const userTimeZone = await getUserTimezone(calendar);

      // Build the event object with user's timezone
      // The input timestamps are already in RFC3339 format from the find-availability tool
      const eventResource: calendar_v3.Schema$Event = {
        summary: title,
        start: {
          dateTime: startDateTime,
          timeZone: userTimeZone
        },
        end: {
          dateTime: endDateTime,
          timeZone: userTimeZone
        },
      };

      console.log('[CreateEvent] Event resource:', eventResource);

      try {
        const response = await calendar.events.insert({
          calendarId: 'primary',
          requestBody: eventResource,
        });

        console.log('[CreateEvent] Event created successfully:', response.data.id);

        return {
          event: response.data,
        };
      } catch (error) {
        console.error('[CreateEvent] Error creating event:', error);
        throw new Error(`Failed to create event: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  };
}; 