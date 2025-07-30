import { getAthleteActivitiesTool } from "./get-athlete-activities";
import type { ServerToolConfig } from "@/toolkits/types";

export const stravaGetAthleteActivitiesToolConfigServer = (
  stravaApiHeaders: Record<string, string>,
): ServerToolConfig<
  typeof getAthleteActivitiesTool.inputSchema.shape,
  typeof getAthleteActivitiesTool.outputSchema.shape
> => {
  return {
    callback: async ({ page = 1, per_page = 30, before, after }) => {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: per_page.toString(),
      });

      if (before) params.append("before", before.toString());
      if (after) params.append("after", after.toString());

      const response = await fetch(
        `https://www.strava.com/api/v3/athlete/activities?${params}`,
        { headers: stravaApiHeaders },
      );

      if (!response.ok) {
        throw new Error(
          `Strava API error: ${response.status} ${response.statusText}`,
        );
      }

      const activities = await response.json();
      return { activities };
    },
    message: "Successfully retrieved athlete activities from Strava.",
  };
};
