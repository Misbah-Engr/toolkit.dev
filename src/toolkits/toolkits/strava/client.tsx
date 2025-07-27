import { StravaWrapper } from "./wrapper";
import { createClientToolkit } from "@/toolkits/create-toolkit";
import { SiStrava } from "@icons-pack/react-simple-icons";
import { baseStravaToolkitConfig } from "./base";
import { StravaTools } from "./tools";
import { stravaGetAthleteProfileToolConfigClient } from "./tools/client";
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
  }
); 