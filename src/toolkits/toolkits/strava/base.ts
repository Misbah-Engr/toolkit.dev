import { z } from "zod";

import { StravaTools } from "./tools";

import { getAthleteBase } from "./tools/profile/base";
import { getActivityDetailsBase } from "./tools/activity-details/base";

import { getAthleteActivitiesBase } from "./tools/get-athlete-activities-base";
import { getAthleteStatsBase } from "./tools/get-athlete-stats-base";
import { searchSegmentsBase } from "./tools/search-segments-base";
import { getSegmentDetailsBase } from "./tools/get-segment-details-base";
import { getSegmentLeaderboardBase } from "./tools/get-segment-leaderboard-base";
import { getRoutesBase } from "./tools/get-routes-base";
import { getAthleteZonesBase } from "./tools/get-athlete-zones-base";

import type { ToolkitConfig } from "@/toolkits/types";

export const stravaParameters = z.object({});

export const baseStravaToolkitConfig: ToolkitConfig<
  StravaTools,
  typeof stravaParameters.shape
> = {
  tools: {
    [StravaTools.GetAthleteProfile]: getAthleteBase,
    [StravaTools.GetAthleteActivities]: getAthleteActivitiesBase,
    [StravaTools.GetActivityDetails]: getActivityDetailsBase,
    [StravaTools.GetAthleteStats]: getAthleteStatsBase,
    [StravaTools.SearchSegments]: searchSegmentsBase,
    [StravaTools.GetSegmentDetails]: getSegmentDetailsBase,
    [StravaTools.GetSegmentLeaderboard]: getSegmentLeaderboardBase,
    [StravaTools.GetRoutes]: getRoutesBase,
    [StravaTools.GetAthleteZones]: getAthleteZonesBase,
  },
  parameters: stravaParameters,
};
