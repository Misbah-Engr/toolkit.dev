import type { searchSegmentsTool } from "./search-segments";
import type { ServerToolConfig } from "@/toolkits/types";

export const stravaSearchSegmentsToolConfigServer = (
  stravaApiHeaders: Record<string, string>,
): ServerToolConfig<
  typeof searchSegmentsTool.inputSchema.shape,
  typeof searchSegmentsTool.outputSchema.shape
> => {
  return {
    callback: async ({ bounds, activity_type }) => {
      const params = new URLSearchParams({ bounds });
      if (activity_type) {
        params.append("activity_type", activity_type);
      }

      const response = await fetch(
        `https://www.strava.com/api/v3/segments/explore?${params}`,
        { headers: stravaApiHeaders },
      );

      if (!response.ok) {
        throw new Error(
          `Strava API error: ${response.status} ${response.statusText}`,
        );
      }

      const result = await response.json();
      return { segments: result.segments || [] };
    },
    message: "Successfully searched segments from Strava.",
  };
};
