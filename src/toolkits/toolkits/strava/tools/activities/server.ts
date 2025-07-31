import type { Strava } from "strava";

import type { ServerToolConfig } from "@/toolkits/types";

import type { getActivitiesBase } from "./base";

export const getActivitiesToolConfigServer = (
  strava: Strava,
): ServerToolConfig<
  typeof getActivitiesBase.inputSchema.shape,
  typeof getActivitiesBase.outputSchema.shape
> => {
  return {
    callback: async ({ page = 1, per_page = 30, before, after }) => {
      const activities = await strava.activities.getLoggedInAthleteActivities({
        page,
        per_page,
        before,
        after,
      });

      return {
        activities,
      };
    },
    message: "Successfully retrieved athlete activities from Strava.",
  };
};
