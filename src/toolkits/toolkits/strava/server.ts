import { Strava } from "strava";

import { createServerToolkit } from "@/toolkits/create-toolkit";
import { baseStravaToolkitConfig } from "./base";
import { stravaGetAthleteProfileToolConfigServer } from "./tools/profile/server";
import { stravaGetAthleteActivitiesToolConfigServer } from "./tools/get-athlete-activities-server";
import { stravaGetActivityDetailsToolConfigServer } from "./tools/get-activity-details-server";
import { stravaGetAthleteStatsToolConfigServer } from "./tools/get-athlete-stats-server";
import { stravaSearchSegmentsToolConfigServer } from "./tools/search-segments-server";
import { stravaGetSegmentDetailsToolConfigServer } from "./tools/get-segment-details-server";
import { stravaGetSegmentLeaderboardToolConfigServer } from "./tools/get-segment-leaderboard-server";
import { stravaGetRoutesToolConfigServer } from "./tools/get-routes-server";
import { stravaGetAthleteZonesToolConfigServer } from "./tools/get-athlete-zones-server";
import { StravaTools } from "./tools";
import { api } from "@/trpc/server";
import { env } from "@/env";

export const stravaToolkitServer = createServerToolkit(
  baseStravaToolkitConfig,
  `You have access to the comprehensive Strava toolkit for fitness tracking and activity analysis. This toolkit provides:

- **Athlete Profile** - Get user information and premium status
- **Activity Management** - List activities with filtering and get detailed workout analysis
- **Performance Analytics** - Comprehensive statistics and training zones
- **Segment Exploration** - Search segments, get details, and view leaderboards
- **Route Planning** - Access saved routes (Premium feature)

Use these tools to help users analyze their fitness data, track performance trends, explore popular segments, and gain insights into their training patterns.`,
  async () => {
    const account = await api.accounts.getAccountByProvider("strava");

    if (!account?.refresh_token) {
      throw new Error(
        "No Strava account found. Please connect your Strava account first.",
      );
    }

    const strava = new Strava({
      client_id: env.AUTH_STRAVA_ID,
      client_secret: env.AUTH_STRAVA_SECRET,
      refresh_token: account.refresh_token,
    });

    return {
      [StravaTools.GetAthleteProfile]:
        stravaGetAthleteProfileToolConfigServer(strava),
      [StravaTools.GetAthleteActivities]:
        stravaGetAthleteActivitiesToolConfigServer(strava),
      [StravaTools.GetActivityDetails]:
        stravaGetActivityDetailsToolConfigServer(strava),
      [StravaTools.GetAthleteStats]:
        stravaGetAthleteStatsToolConfigServer(strava),
      [StravaTools.SearchSegments]:
        stravaSearchSegmentsToolConfigServer(strava),
      [StravaTools.GetSegmentDetails]:
        stravaGetSegmentDetailsToolConfigServer(strava),
      [StravaTools.GetSegmentLeaderboard]:
        stravaGetSegmentLeaderboardToolConfigServer(strava),
      [StravaTools.GetRoutes]: stravaGetRoutesToolConfigServer(strava),
      [StravaTools.GetAthleteZones]:
        stravaGetAthleteZonesToolConfigServer(strava),
    };
  },
);
