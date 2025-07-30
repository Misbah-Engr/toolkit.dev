import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const getSegmentLeaderboardTool = createBaseTool({
  description: "Get the leaderboard for a specific segment",
  inputSchema: z.object({
    id: z.number().describe("The segment ID"),
    gender: z.enum(["M", "F"]).optional().describe("Filter by gender"),
    age_group: z
      .enum(["0_19", "20_24", "25_34", "35_44", "45_54", "55_64", "65_plus"])
      .optional()
      .describe("Filter by age group"),
    weight_class: z
      .enum([
        "0_124",
        "125_149",
        "150_164",
        "165_179",
        "180_199",
        "200_224",
        "225_plus",
      ])
      .optional()
      .describe("Filter by weight class in pounds"),
    following: z
      .boolean()
      .optional()
      .describe("Filter to just athletes the authenticated user is following"),
    club_id: z.number().optional().describe("Filter by club membership"),
    date_range: z
      .enum(["this_year", "this_month", "this_week", "today"])
      .optional()
      .describe("Filter by date range"),
    page: z.number().optional().describe("Page number for pagination"),
    per_page: z.number().optional().describe("Number of entries per page"),
  }),
  outputSchema: z.object({
    effort_count: z.number(),
    entries: z.array(
      z.object({
        athlete_name: z.string(),
        athlete_id: z.number(),
        athlete_gender: z.string(),
        average_hr: z.number().nullable(),
        average_watts: z.number().nullable(),
        distance: z.number(),
        elapsed_time: z.number(),
        moving_time: z.number(),
        start_date: z.string(),
        start_date_local: z.string(),
        activity_id: z.number(),
        effort_id: z.number(),
        rank: z.number(),
      }),
    ),
  }),
});
