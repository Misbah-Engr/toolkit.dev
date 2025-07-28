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
          calendarId: "primary",
          requestBody: eventResource,
          sendNotifications: true,
        });

        const event = response.data;

        return {
          id: event.id!,
          summary: event.summary ?? undefined,
          description: event.description ?? undefined,
          location: event.location ?? undefined,
          start: {
            dateTime: event.start?.dateTime ?? undefined,
            date: event.start?.date ?? undefined,
            timeZone: event.start?.timeZone ?? undefined,
          },
          end: {
            dateTime: event.end?.dateTime ?? undefined,
            date: event.end?.date ?? undefined,
            timeZone: event.end?.timeZone ?? undefined,
          },
          status: event.status ?? undefined,
          visibility: event.visibility ?? undefined,
          organizer: event.organizer
            ? {
                email: event.organizer.email ?? undefined,
                displayName: event.organizer.displayName ?? undefined,
              }
            : undefined,
          attendees: event.attendees?.map((attendee: calendar_v3.Schema$EventAttendee) => ({
            email: attendee.email ?? undefined,
            displayName: attendee.displayName ?? undefined,
            responseStatus: attendee.responseStatus ?? undefined,
            optional: attendee.optional ?? undefined,
          })),
          htmlLink: event.htmlLink ?? undefined,
          created: event.created ?? undefined,
          updated: event.updated ?? undefined,
        };
      } catch (error) {
        console.error('[CreateEvent] Error creating event:', {
          error: error instanceof Error ? error.message : String(error),
          eventResource,
          userTimeZone
        });
        
        // Provide more specific error messages based on the error type
        if (error instanceof Error) {
          if (error.message.includes('403')) {
            throw new Error("Permission denied: You don't have permission to create events in this calendar");
          } else if (error.message.includes('400')) {
            throw new Error("Invalid request: Please check the event details and try again");
          } else if (error.message.includes('401')) {
            throw new Error("Authentication failed: Please reconnect your Google Calendar account");
          }
        }
        
        throw new Error(`Failed to create calendar event: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
    message:
      "The user is shown the created event details. Give a brief confirmation that the event was created successfully and ask if they need to modify anything or create additional events.",
  };
}; 