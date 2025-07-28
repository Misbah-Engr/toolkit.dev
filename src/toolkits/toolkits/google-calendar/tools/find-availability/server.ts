import { type findAvailabilityTool } from "./base";
import type { ServerToolConfig } from "@/toolkits/types";
import type { Client } from "@notionhq/client";
import { analyzeAvailability } from "./lib";

export const googleCalendarFindAvailabilityToolConfigServer = (
  accessToken: string,
  notion: Client, // Properly typed now
): ServerToolConfig<
  typeof findAvailabilityTool.inputSchema.shape,
  typeof findAvailabilityTool.outputSchema.shape
> => {
  return {
    message:
      "The user is shown available time slots in an organized grid. Give a brief summary of the availability found and ask if they would like to schedule a meeting for any of the suggested times. If defaults were used (60-minute duration, 7-day search, 9 AM-5 PM), mention this briefly.",
    callback: async (params) => {
      if (!accessToken) {
        throw new Error("Google Calendar access token is not available");
      }

      return await analyzeAvailability(params, accessToken, notion);
    },
  };
}; 