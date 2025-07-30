import type { Strava } from "strava";

import type { ServerToolConfig } from "@/toolkits/types";

import type { getActivityDetailsBase } from "./base";

export const getActivityDetailsToolConfigServer = (
  strava: Strava,
): ServerToolConfig<
  typeof getActivityDetailsBase.inputSchema.shape,
  typeof getActivityDetailsBase.outputSchema.shape
> => {
  return {
    callback: async ({ id, include_all_efforts = false }) => {
      const params = new URLSearchParams();
      if (include_all_efforts) {
        params.append("include_all_efforts", "true");
      }

      const activity = await strava.activities.getActivityById({
        id,
        include_all_efforts,
      });

      return {
        activity,
      };
    },
    message: "Successfully retrieved activity details from Strava.",
  };
};
