import { type searchEventsTool } from "./base";
import { google } from "googleapis";
import type { ServerToolConfig } from "@/toolkits/types";

export const googleCalendarSearchEventsToolConfigServer = (
  accessToken: string,
): ServerToolConfig<
  typeof searchEventsTool.inputSchema.shape,
  typeof searchEventsTool.outputSchema.shape
> => {
  return {
    callback: async ({
      query,
      calendarId,
      timeMin,
      timeMax,
      maxResults,
      orderBy,
      singleEvents,
    }) => {
      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });

      const calendar = google.calendar({ version: "v3", auth });

      const response = await calendar.events.list({
        calendarId: calendarId || "primary",
        q: query,
        timeMin: timeMin || undefined,
        timeMax: timeMax || undefined,
        maxResults: maxResults || 250,
        orderBy:
          orderBy && orderBy !== ""
            ? (orderBy as "startTime" | "updated")
            : undefined,
        singleEvents: singleEvents ?? true,
      });

      const events =
        response.data.items?.map((event) => ({
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
          organizer: event.organizer
            ? {
                email: event.organizer.email ?? undefined,
                displayName: event.organizer.displayName ?? undefined,
              }
            : undefined,
          attendees: event.attendees?.map((attendee) => ({
            email: attendee.email ?? undefined,
            displayName: attendee.displayName ?? undefined,
            responseStatus: attendee.responseStatus ?? undefined,
          })),
          created: event.created ?? undefined,
          updated: event.updated ?? undefined,
        })) ?? [];

      return {
        events,
        timeZone: response.data.timeZone ?? undefined,
      };
    },
  };
};
