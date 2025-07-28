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
        maxResults: maxResults || 5,
        orderBy:
          orderBy && orderBy !== ""
            ? (orderBy as "startTime" | "updated")
            : "updated",
        singleEvents: singleEvents ?? true,
      });

      return {
        events: response.data.items || [],
        timeZone: response.data.timeZone || undefined,
      };
    },
  };
};
