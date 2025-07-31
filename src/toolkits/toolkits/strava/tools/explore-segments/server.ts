import type { Strava } from "strava";

import type { ServerToolConfig } from "@/toolkits/types";

import type { exploreSegmentsBase } from "./base";

export const exploreSegmentsToolConfigServer = (
  strava: Strava,
): ServerToolConfig<
  typeof exploreSegmentsBase.inputSchema.shape,
  typeof exploreSegmentsBase.outputSchema.shape
> => {
  return {
    callback: async ({ bounds, activity_type }) => {
      const { segments: explorerSegments } =
        await strava.segments.exploreSegments({
          bounds,
          // @ts-expect-error - typo in strava library
          activity_type: activity_type,
        });

      const segments = await Promise.all(
        explorerSegments.map((segment) =>
          strava.segments.getSegmentById({ id: segment.id }),
        ),
      );

      return { segments };
    },
    message: "Successfully searched segments from Strava.",
  };
};
