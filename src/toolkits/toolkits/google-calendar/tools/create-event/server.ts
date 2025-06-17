import { type createEventTool } from "./base";
import { google } from "googleapis";
import type { ServerToolConfig } from "@/toolkits/types";
import type { calendar_v3 } from "googleapis";

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
      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });

      const calendar = google.calendar({ version: "v3", auth });

      // Build the event object with simplified parameters
      const eventResource: calendar_v3.Schema$Event = {
        summary: title,
        start: {
          dateTime: startDateTime,
        },
        end: {
          dateTime: endDateTime,
        },
      };

      const response = await calendar.events.insert({
        calendarId: "primary", // Use primary calendar by default
        requestBody: eventResource,
        sendNotifications: true, // Send notifications to attendees
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
    },
  };
}; 