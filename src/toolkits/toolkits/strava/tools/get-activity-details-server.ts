import { getActivityDetailsTool } from "./get-activity-details";
import type { ServerToolConfig } from "@/toolkits/types";

export const stravaGetActivityDetailsToolConfigServer = (
  stravaApiHeaders: Record<string, string>,
): ServerToolConfig<
  typeof getActivityDetailsTool.inputSchema.shape,
  typeof getActivityDetailsTool.outputSchema.shape
> => {
  return {
    callback: async ({ id, include_all_efforts = false }) => {
      const params = new URLSearchParams();
      if (include_all_efforts) {
        params.append("include_all_efforts", "true");
      }

      const url = `https://www.strava.com/api/v3/activities/${id}${params.toString() ? `?${params}` : ""}`;
      const response = await fetch(url, { headers: stravaApiHeaders });

      if (!response.ok) {
        throw new Error(
          `Strava API error: ${response.status} ${response.statusText}`,
        );
      }

      const activity = await response.json();
      return activity;
    },
    message: "Successfully retrieved activity details from Strava.",
  };
};
