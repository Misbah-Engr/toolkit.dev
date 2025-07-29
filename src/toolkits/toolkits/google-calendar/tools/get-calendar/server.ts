import { type getCalendarTool } from "./base";
import type { ServerToolConfig } from "@/toolkits/types";
import type { calendar_v3 } from "googleapis";

export const googleCalendarGetCalendarToolConfigServer = (
  calendar: calendar_v3.Calendar,
): ServerToolConfig<
  typeof getCalendarTool.inputSchema.shape,
  typeof getCalendarTool.outputSchema.shape
> => {
  return {
    callback: async ({ calendarId }) => {
      const response = await calendar.calendars.get({
        calendarId,
      });

      return {
        calendar: response.data,
      };
    },
  };
};
