import { type listCalendarsTool } from "./base";
import type { ServerToolConfig } from "@/toolkits/types";
import type { calendar_v3 } from "googleapis";

export const googleCalendarListCalendarsToolConfigServer = (
  calendar: calendar_v3.Calendar,
): ServerToolConfig<
  typeof listCalendarsTool.inputSchema.shape,
  typeof listCalendarsTool.outputSchema.shape
> => {
  return {
    callback: async ({ maxResults, pageToken }) => {
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
