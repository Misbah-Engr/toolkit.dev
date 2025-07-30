import { getAthleteStatsTool } from "./get-athlete-stats";
import type { ServerToolConfig } from "@/toolkits/types";

export const stravaGetAthleteStatsToolConfigServer = (
  stravaApiHeaders: Record<string, string>,
): ServerToolConfig<
  typeof getAthleteStatsTool.inputSchema.shape,
  typeof getAthleteStatsTool.outputSchema.shape
> => {
  return {
    callback: async () => {
      const response = await fetch(
        "https://www.strava.com/api/v3/athletes/stats",
        { headers: stravaApiHeaders },
      );

      if (!response.ok) {
        throw new Error(
          `Strava API error: ${response.status} ${response.statusText}`,
        );
      }

      const stats = await response.json();
      return stats;
    },
    message: "Successfully retrieved athlete statistics from Strava.",
  };
};
