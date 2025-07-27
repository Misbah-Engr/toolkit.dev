import { StravaWrapper } from "./wrapper";
import { createClientToolkit } from "@/toolkits/create-toolkit";
import { SiStrava } from "@icons-pack/react-simple-icons";
import { baseStravaToolkitConfig } from "./base";
import { StravaTools } from "./tools";
import { 
  stravaGetAthleteProfileToolConfigClient,
  stravaGetAthleteActivitiesToolConfigClient,
  stravaGetActivityDetailsToolConfigClient,
  stravaGetAthleteStatsToolConfigClient,
  stravaSearchSegmentsToolConfigClient,
  stravaGetSegmentDetailsToolConfigClient,
  stravaGetSegmentLeaderboardToolConfigClient,
  stravaGetRoutesToolConfigClient,
  stravaGetAthleteZonesToolConfigClient,
} from "./tools/client";
import { ToolkitGroups } from "@/toolkits/types";

export const stravaClientToolkit = createClientToolkit(
  baseStravaToolkitConfig,
  {
    name: "Strava",
    description: "Access your Strava activities and performance data",
    icon: SiStrava,
    form: null,
    Wrapper: StravaWrapper,
    type: ToolkitGroups.DataSource,
  },
  {
    [StravaTools.GetAthleteProfile]: stravaGetAthleteProfileToolConfigClient,
    [StravaTools.GetAthleteActivities]: stravaGetAthleteActivitiesToolConfigClient,
    [StravaTools.GetActivityDetails]: stravaGetActivityDetailsToolConfigClient,
    [StravaTools.GetAthleteStats]: stravaGetAthleteStatsToolConfigClient,
    [StravaTools.SearchSegments]: stravaSearchSegmentsToolConfigClient,
    [StravaTools.GetSegmentDetails]: stravaGetSegmentDetailsToolConfigClient,
    [StravaTools.GetSegmentLeaderboard]: stravaGetSegmentLeaderboardToolConfigClient,
    [StravaTools.GetRoutes]: stravaGetRoutesToolConfigClient,
    [StravaTools.GetAthleteZones]: stravaGetAthleteZonesToolConfigClient,
  }
); 