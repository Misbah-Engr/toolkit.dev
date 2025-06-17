import { type createEventTool } from "./base";
import { google } from "googleapis";
import type { ServerToolConfig } from "@/toolkits/types";

export const googleCalendarCreateEventToolConfigServer = (
  accessToken: string,
): ServerToolConfig<
  typeof createEventTool.inputSchema.shape,
  typeof createEventTool.outputSchema.shape
> => {
  return {
    callback: async ({
      calendarId,
      summary,
      description,
      location,
      start,
      end,
      attendees,
      visibility,
      transparency,
      reminders,
      sendUpdates,
    }) => {
      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });

      const calendar = google.calendar({ version: "v3", auth });

      // Construct the event object
      const eventResource = {
        summary,
        description,
        location,
        start: {
          dateTime: start.dateTime,
          date: start.date,
          timeZone: start.timeZone,
        },
        end: {
          dateTime: end.dateTime,
          date: end.date,
          timeZone: end.timeZone,
        },
        attendees: attendees?.map((attendee) => ({
          email: attendee.email,
          displayName: attendee.displayName,
          optional: attendee.optional,
          responseStatus: attendee.responseStatus,
        })),
        visibility,
        transparency,
        reminders: reminders ? {
          useDefault: reminders.useDefault,
          overrides: reminders.overrides?.map((override) => ({
            method: override.method,
            minutes: override.minutes,
          })),
        } : undefined,
      };

      const response = await calendar.events.insert({
        calendarId,
        requestBody: eventResource,
        sendUpdates: sendUpdates || "all",
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
        attendees: event.attendees?.map((attendee: any) => ({
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