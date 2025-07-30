import { getAthleteZonesTool } from "./get-athlete-zones";
import type { ServerToolConfig } from "@/toolkits/types";

export const stravaGetAthleteZonesToolConfigServer = (
  stravaApiHeaders: Record<string, string>,
): ServerToolConfig<
  typeof getAthleteZonesTool.inputSchema.shape,
  typeof getAthleteZonesTool.outputSchema.shape
> => {
  return {
    callback: async () => {
      const response = await fetch(
        "https://www.strava.com/api/v3/athlete/zones",
        { headers: stravaApiHeaders },
      );

      if (!response.ok) {
        throw new Error(
          `Strava API error: ${response.status} ${response.statusText}`,
        );
      }

      const zones = await response.json();
      return zones;
    },
    message: "Successfully retrieved athlete zones from Strava.",
  };
};
