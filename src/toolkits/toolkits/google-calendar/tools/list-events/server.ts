import { type listEventsTool } from "./base";
import type { ServerToolConfig } from "@/toolkits/types";
import { fetchEvents } from "../../lib";
import type { calendar_v3 } from "googleapis";

export const googleCalendarListEventsToolConfigServer = (
  calendar: calendar_v3.Calendar,
): ServerToolConfig<
  typeof listEventsTool.inputSchema.shape,
  typeof listEventsTool.outputSchema.shape
> => {
  return {
    callback: async ({
      calendarId,
      timeMin,
      timeMax,
      maxResults,
      pageToken,
      orderBy,
      singleEvents,
    }) => {
      const result = await fetchEvents(calendar, {
        calendarId,
        timeMin,
        timeMax,
        maxResults: maxResults || 5,
        pageToken,
        orderBy,
        singleEvents,
      });

      return {
        events: result.events,
        nextPageToken: result.nextPageToken,
        timeZone: result.timeZone,
      };
    },
  };
};
