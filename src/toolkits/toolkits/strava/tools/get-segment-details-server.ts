import { getSegmentDetailsTool } from "./get-segment-details";
import type { ServerToolConfig } from "@/toolkits/types";

export const stravaGetSegmentDetailsToolConfigServer = (
  stravaApiHeaders: Record<string, string>,
): ServerToolConfig<
  typeof getSegmentDetailsTool.inputSchema.shape,
  typeof getSegmentDetailsTool.outputSchema.shape
> => {
  return {
    callback: async ({ id }) => {
      const response = await fetch(
        `https://www.strava.com/api/v3/segments/${id}`,
        { headers: stravaApiHeaders },
      );

      if (!response.ok) {
        throw new Error(
          `Strava API error: ${response.status} ${response.statusText}`,
        );
      }

      const segment = await response.json();
      return segment;
    },
    message: "Successfully retrieved segment details from Strava.",
  };
};
