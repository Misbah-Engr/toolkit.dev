import type { Strava } from "strava";

import type { ServerToolConfig } from "@/toolkits/types";

import type { getSegmentDetailsBase } from "./base";

export const getSegmentDetailsToolConfigServer = (
  strava: Strava,
): ServerToolConfig<
  typeof getSegmentDetailsBase.inputSchema.shape,
  typeof getSegmentDetailsBase.outputSchema.shape
> => {
  return {
    callback: async ({ id }) => {
      const segment = await strava.segments.getSegmentById({ id });

      return {
        segment,
      };
    },
    message: "Successfully retrieved segment details from Strava.",
  };
};
