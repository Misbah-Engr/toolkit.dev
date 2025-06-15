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
    callback: async ({ maxResults = 100, pageToken }) => {
      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });
      
      const calendar = google.calendar({ version: "v3", auth });
      
      const response = await calendar.calendarList.list({
        maxResults,
        pageToken,
      });
      
      const calendars = response.data.items?.map((cal) => ({
        id: cal.id!,
        summary: cal.summary!,
        description: cal.description ?? undefined,
        timeZone: cal.timeZone!,
        colorId: cal.colorId ?? undefined,
        backgroundColor: cal.backgroundColor ?? undefined,
        foregroundColor: cal.foregroundColor ?? undefined,
        selected: cal.selected ?? undefined,
        accessRole: cal.accessRole!,
        primary: cal.primary ?? undefined,
      })) ?? [];
      
      return {
        calendars,
        nextPageToken: response.data.nextPageToken ?? undefined,
      };
    },
  };
};