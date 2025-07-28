import { type listEventsTool } from "./base";
import type { ServerToolConfig } from "@/toolkits/types";
import { createCalendarClient, fetchEvents } from "../../lib";

export const googleCalendarListEventsToolConfigServer = (
  accessToken: string,
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
      const calendar = createCalendarClient(accessToken);

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
