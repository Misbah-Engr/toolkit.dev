import { type searchEventsTool } from "./base";
import type { ServerToolConfig } from "@/toolkits/types";
import type { calendar_v3 } from "googleapis";

export const googleCalendarSearchEventsToolConfigServer = (
  calendar: calendar_v3.Calendar,
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
      const response = await calendar.events.list({
        calendarId: calendarId ?? "primary",
        q: query,
        timeMin: timeMin ?? undefined,
        timeMax: timeMax ?? undefined,
        maxResults: maxResults ?? 5,
        orderBy:
          orderBy && orderBy !== ""
            ? (orderBy as "startTime" | "updated")
            : "updated",
        singleEvents: singleEvents ?? true,
      });

      return {
        events: response.data.items ?? [],
        timeZone: response.data.timeZone ?? undefined,
      };
    },
  };
};
