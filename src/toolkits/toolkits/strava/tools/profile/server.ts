import type { ServerToolConfig } from "@/toolkits/types";
import type { Strava } from "strava";
import type { getAthleteBase } from "./base";

export const stravaGetAthleteProfileToolConfigServer = (
  strava: Strava,
): ServerToolConfig<
  typeof getAthleteBase.inputSchema.shape,
  typeof getAthleteBase.outputSchema.shape
> => {
  return {
    callback: async () => {
      const athlete = await strava.athletes.getLoggedInAthlete();

      return {
        athlete,
      };
    },
    message: "Successfully retrieved athlete profile from Strava.",
  };
};
