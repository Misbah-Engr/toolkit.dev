import { getSegmentLeaderboardTool } from "./get-segment-leaderboard";
import type { ServerToolConfig } from "@/toolkits/types";

export const stravaGetSegmentLeaderboardToolConfigServer = (
  stravaApiHeaders: Record<string, string>,
): ServerToolConfig<
  typeof getSegmentLeaderboardTool.inputSchema.shape,
  typeof getSegmentLeaderboardTool.outputSchema.shape
> => {
  return {
    callback: async ({
      id,
      gender,
      age_group,
      weight_class,
      following,
      club_id,
      date_range,
      page = 1,
      per_page = 10,
    }) => {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: per_page.toString(),
      });

      if (gender) params.append("gender", gender);
      if (age_group) params.append("age_group", age_group);
      if (weight_class) params.append("weight_class", weight_class);
      if (following) params.append("following", "true");
      if (club_id) params.append("club_id", club_id.toString());
      if (date_range) params.append("date_range", date_range);

      const response = await fetch(
        `https://www.strava.com/api/v3/segments/${id}/leaderboard?${params}`,
        { headers: stravaApiHeaders },
      );

      if (!response.ok) {
        throw new Error(
          `Strava API error: ${response.status} ${response.statusText}`,
        );
      }

      const leaderboard = await response.json();
      return leaderboard;
    },
    message: "Successfully retrieved segment leaderboard from Strava.",
  };
};
