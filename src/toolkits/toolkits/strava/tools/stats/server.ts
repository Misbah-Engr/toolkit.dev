import type { Strava } from "strava";

import type { ServerToolConfig } from "@/toolkits/types";

import type { getAthleteStatsBase } from "./base";

export const getAthleteStatsToolConfigServer = (
  strava: Strava,
): ServerToolConfig<
  typeof getAthleteStatsBase.inputSchema.shape,
  typeof getAthleteStatsBase.outputSchema.shape
> => {
  return {
    callback: async () => {
      const { id } = await strava.athletes.getLoggedInAthlete();

      const stats = await strava.athletes.getStats({ id });

      return {
        stats,
      };
    },
    message: "Successfully retrieved athlete statistics from Strava.",
  };
};
