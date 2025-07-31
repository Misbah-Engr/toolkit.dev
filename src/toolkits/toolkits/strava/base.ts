import { z } from "zod";

import { StravaTools } from "./tools";

import {
  getAthleteBase,
  getActivityDetailsBase,
  getActivitiesBase,
  getAthleteStatsBase,
  getAthleteZonesBase,
  getRoutesBase,
  getSegmentDetailsBase,
  exploreSegmentsBase,
} from "./tools";

import type { ToolkitConfig } from "@/toolkits/types";

export const stravaParameters = z.object({});

export const baseStravaToolkitConfig: ToolkitConfig<
  StravaTools,
  typeof stravaParameters.shape
> = {
  tools: {
    [StravaTools.GetAthleteProfile]: getAthleteBase,
    [StravaTools.GetAthleteActivities]: getActivitiesBase,
    [StravaTools.GetActivityDetails]: getActivityDetailsBase,
    [StravaTools.GetAthleteStats]: getAthleteStatsBase,
    [StravaTools.ExploreSegments]: exploreSegmentsBase,
    [StravaTools.GetSegmentDetails]: getSegmentDetailsBase,
    [StravaTools.GetRoutes]: getRoutesBase,
    [StravaTools.GetAthleteZones]: getAthleteZonesBase,
  },
  parameters: stravaParameters,
};
