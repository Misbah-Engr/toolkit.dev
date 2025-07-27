import type { ToolkitConfig } from "@/toolkits/types";
import { z } from "zod";
import { StravaTools } from "./tools";
import { getAthleteProfileTool } from "./tools/get-athlete-profile";

export const stravaParameters = z.object({});

export const baseStravaToolkitConfig: ToolkitConfig<
  StravaTools,
  typeof stravaParameters.shape
> = {
  tools: {
    [StravaTools.GetAthleteProfile]: getAthleteProfileTool,
  },
  parameters: stravaParameters,
}; 