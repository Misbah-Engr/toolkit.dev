import { type getEventTool } from "./base";
import type { ServerToolConfig } from "@/toolkits/types";
import type { calendar_v3 } from "googleapis";

export const googleCalendarGetEventToolConfigServer = (
  calendar: calendar_v3.Calendar,
): ServerToolConfig<
  typeof getEventTool.inputSchema.shape,
  typeof getEventTool.outputSchema.shape
> => {
  return {
    callback: async ({ calendarId, eventId }) => {
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
