import type { Strava } from "strava";

import type { getAthleteZonesBase } from "./base";

import type { ServerToolConfig } from "@/toolkits/types";

export const getAthleteZonesToolConfigServer = (
  strava: Strava,
): ServerToolConfig<
  typeof getAthleteZonesBase.inputSchema.shape,
  typeof getAthleteZonesBase.outputSchema.shape
> => {
  return {
    callback: async () => {
      const zones = await strava.athletes.getLoggedInAthleteZones();

      return {
        zones,
      };
    },
    message: "Successfully retrieved athlete zones from Strava.",
  };
};
