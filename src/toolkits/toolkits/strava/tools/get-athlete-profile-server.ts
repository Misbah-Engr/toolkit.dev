import { getAthleteProfileTool } from "./get-athlete-profile";
import type { ServerToolConfig } from "@/toolkits/types";

export const stravaGetAthleteProfileToolConfigServer = (
  stravaApiHeaders: Record<string, string>,
): ServerToolConfig<
  typeof getAthleteProfileTool.inputSchema.shape,
  typeof getAthleteProfileTool.outputSchema.shape
> => {
  return {
    callback: async () => {
      const response = await fetch("https://www.strava.com/api/v3/athlete", {
        headers: stravaApiHeaders,
      });

      if (!response.ok) {
        throw new Error(
          `Strava API error: ${response.status} ${response.statusText}`,
        );
      }

      const athlete = await response.json();
      return athlete;
    },
    message: "Successfully retrieved athlete profile from Strava.",
  };
};
