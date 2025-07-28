import { type getCalendarTool } from "./base";
import { google } from "googleapis";
import type { ServerToolConfig } from "@/toolkits/types";

export const googleCalendarGetCalendarToolConfigServer = (
  accessToken: string,
): ServerToolConfig<
  typeof getCalendarTool.inputSchema.shape,
  typeof getCalendarTool.outputSchema.shape
> => {
  return {
    callback: async ({ calendarId }) => {
      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });

      const calendar = google.calendar({ version: "v3", auth });

      const response = await calendar.calendars.get({
        calendarId,
      });

      return {
        calendar: response.data,
      };
    },
  };
};
