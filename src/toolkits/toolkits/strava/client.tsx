import { StravaWrapper } from "./wrapper";
import { createClientToolkit } from "@/toolkits/create-toolkit";
import { SiStrava } from "@icons-pack/react-simple-icons";
import { baseStravaToolkitConfig } from "./base";
import { StravaTools } from "./tools";
import {
  stravaGetAthleteActivitiesToolConfigClient,
  stravaGetAthleteStatsToolConfigClient,
  stravaSearchSegmentsToolConfigClient,
  stravaGetSegmentDetailsToolConfigClient,
  stravaGetSegmentLeaderboardToolConfigClient,
  stravaGetRoutesToolConfigClient,
  stravaGetAthleteZonesToolConfigClient,
} from "./tools/client";
import { ToolkitGroups } from "@/toolkits/types";
import { Link } from "../components/link";
import { getAthleteToolConfigClient } from "./tools/profile/client";
import { getActivityDetailsToolConfigClient } from "./tools/activity-details/client";

export const stravaClientToolkit = createClientToolkit(
  baseStravaToolkitConfig,
  {
    name: "Strava",
    description: "Access your Strava activities and performance data",
    icon: SiStrava,
    form: null,
    Wrapper: StravaWrapper,
    type: ToolkitGroups.DataSource,
    envVars: [
      {
        type: "all",
        keys: ["AUTH_STRAVA_ID", "AUTH_STRAVA_SECRET"],
        description: (
          <span>
            Create a Strava OAuth application{" "}
            <Link href="https://developers.strava.com/docs/getting-started/#account">
              here
            </Link>
          </span>
        ),
      },
    ],
  },
  {
    [StravaTools.GetAthleteProfile]: getAthleteToolConfigClient,
    [StravaTools.GetAthleteActivities]:
      stravaGetAthleteActivitiesToolConfigClient,
    [StravaTools.GetActivityDetails]: getActivityDetailsToolConfigClient,
    [StravaTools.GetAthleteStats]: stravaGetAthleteStatsToolConfigClient,
    [StravaTools.SearchSegments]: stravaSearchSegmentsToolConfigClient,
    [StravaTools.GetSegmentDetails]: stravaGetSegmentDetailsToolConfigClient,
    [StravaTools.GetSegmentLeaderboard]:
      stravaGetSegmentLeaderboardToolConfigClient,
    [StravaTools.GetRoutes]: stravaGetRoutesToolConfigClient,
    [StravaTools.GetAthleteZones]: stravaGetAthleteZonesToolConfigClient,
  },
);
