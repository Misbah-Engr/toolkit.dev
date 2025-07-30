import type { ToolkitConfig } from "@/toolkits/types";
import { z } from "zod";
import { StravaTools } from "./tools";
import { getAthleteProfileTool } from "./tools/get-athlete-profile";
import { getAthleteActivitiesTool } from "./tools/get-athlete-activities";
import { getActivityDetailsTool } from "./tools/get-activity-details";
import { getAthleteStatsTool } from "./tools/get-athlete-stats";
import { searchSegmentsTool } from "./tools/search-segments";
import { getSegmentDetailsTool } from "./tools/get-segment-details";
import { getSegmentLeaderboardTool } from "./tools/get-segment-leaderboard";
import { getRoutesTool } from "./tools/get-routes";
import { getAthleteZonesTool } from "./tools/get-athlete-zones";

export const stravaParameters = z.object({});

export const baseStravaToolkitConfig: ToolkitConfig<
  StravaTools,
  typeof stravaParameters.shape
> = {
  tools: {
    [StravaTools.GetAthleteProfile]: getAthleteProfileTool,
    [StravaTools.GetAthleteActivities]: getAthleteActivitiesTool,
    [StravaTools.GetActivityDetails]: getActivityDetailsTool,
    [StravaTools.GetAthleteStats]: getAthleteStatsTool,
    [StravaTools.SearchSegments]: searchSegmentsTool,
    [StravaTools.GetSegmentDetails]: getSegmentDetailsTool,
    [StravaTools.GetSegmentLeaderboard]: getSegmentLeaderboardTool,
    [StravaTools.GetRoutes]: getRoutesTool,
    [StravaTools.GetAthleteZones]: getAthleteZonesTool,
  },
  parameters: stravaParameters,
};
