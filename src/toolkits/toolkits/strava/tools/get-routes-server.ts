import { getRoutesTool } from "./get-routes";
import type { ServerToolConfig } from "@/toolkits/types";

export const stravaGetRoutesToolConfigServer = (
  stravaApiHeaders: Record<string, string>
): ServerToolConfig<
  typeof getRoutesTool.inputSchema.shape,
  typeof getRoutesTool.outputSchema.shape
> => {
  return {
    callback: async ({ page = 1, per_page = 30 }) => {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: per_page.toString(),
      });

      const response = await fetch(
        `https://www.strava.com/api/v3/athletes/routes?${params}`,
        { headers: stravaApiHeaders }
      );

      if (!response.ok) {
        throw new Error(`Strava API error: ${response.status} ${response.statusText}`);
      }

      const routes = await response.json();
      return { routes };
    },
    message: "Successfully retrieved athlete routes from Strava.",
  };
}; 