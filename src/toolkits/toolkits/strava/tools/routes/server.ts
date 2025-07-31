import type { Strava } from "strava";

import type { ServerToolConfig } from "@/toolkits/types";

import type { getRoutesBase } from "./base";

export const getRoutesToolConfigServer = (
  strava: Strava,
): ServerToolConfig<
  typeof getRoutesBase.inputSchema.shape,
  typeof getRoutesBase.outputSchema.shape
> => {
  return {
    callback: async ({ page = 1, per_page = 30 }) => {
      const { id } = await strava.athletes.getLoggedInAthlete();

      const routes = await strava.routes.getRoutesByAthleteId({
        id,
        page,
        per_page,
      });

      return { routes };
    },
    message: "Successfully retrieved athlete routes from Strava.",
  };
};
