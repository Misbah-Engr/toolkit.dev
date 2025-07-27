import { createServerToolkit } from "@/toolkits/create-toolkit";
import { baseStravaToolkitConfig } from "./base";
import { stravaGetAthleteProfileToolConfigServer } from "./tools/get-athlete-profile-server";
import { StravaTools } from "./tools";
import { api } from "@/trpc/server";

export const stravaToolkitServer = createServerToolkit(
  baseStravaToolkitConfig,
  `You have access to the Strava toolkit for fitness tracking and activity analysis.`,
  async () => {
    const account = await api.accounts.getAccountByProvider("strava");

    if (!account) {
      throw new Error("No Strava account found. Please connect your Strava account first.");
    }

    const stravaApiHeaders = {
      'Authorization': `Bearer ${account.access_token}`,
      'Content-Type': 'application/json',
    };

    return {
      [StravaTools.GetAthleteProfile]: stravaGetAthleteProfileToolConfigServer(stravaApiHeaders),
    };
  },
); 