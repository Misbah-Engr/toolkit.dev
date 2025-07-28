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
      if (!accessToken) {
        throw new Error("Google Calendar access token is not available");
      }

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

      // Convert input times to user's timezone
      const startDate = new Date(startDateTime);
      const endDate = new Date(endDateTime);
      
      // Create RFC3339 timestamps with user's timezone
      const startDateTimeFormatted = startDate.toISOString();
      const endDateTimeFormatted = endDate.toISOString();

      // Build the event object with user's timezone
      const eventResource: calendar_v3.Schema$Event = {
        summary: title,
        start: {
          dateTime: startDateTimeFormatted,
          timeZone: userTimeZone
        },
        end: {
          dateTime: endDateTimeFormatted,
          timeZone: userTimeZone
        },
      };

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
        throw new Error("Failed to create calendar event");
      }
    },
    message:
      "The user is shown the created event details. Give a brief confirmation that the event was created successfully and ask if they need to modify anything or create additional events.",
  };
}; 