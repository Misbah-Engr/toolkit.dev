import { type listCalendarsTool } from "./base";
import { google } from "googleapis";
import type { ServerToolConfig } from "@/toolkits/types";

export const googleCalendarListCalendarsToolConfigServer = (
  accessToken: string,
): ServerToolConfig<
  typeof listCalendarsTool.inputSchema.shape,
  typeof listCalendarsTool.outputSchema.shape
> => {
  return {
    callback: async ({ maxResults, pageToken }) => {
      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });

      const calendar = google.calendar({ version: "v3", auth });

      const response = await calendar.calendarList.list({
        maxResults: maxResults,
        pageToken: pageToken,
      });

      return {
        calendars: response.data.items ?? [],
        nextPageToken: response.data.nextPageToken ?? undefined,
      };
    },
  };
};
