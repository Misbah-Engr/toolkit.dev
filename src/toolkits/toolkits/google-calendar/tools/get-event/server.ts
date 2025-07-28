import { type getEventTool } from "./base";
import { google } from "googleapis";
import type { ServerToolConfig } from "@/toolkits/types";

export const googleCalendarGetEventToolConfigServer = (
  accessToken: string,
): ServerToolConfig<
  typeof getEventTool.inputSchema.shape,
  typeof getEventTool.outputSchema.shape
> => {
  return {
    callback: async ({ calendarId, eventId }) => {
      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });

      const calendar = google.calendar({ version: "v3", auth });

      const response = await calendar.events.get({
        calendarId,
        eventId,
      });

      return {
        event: response.data,
      };
    },
  };
};
