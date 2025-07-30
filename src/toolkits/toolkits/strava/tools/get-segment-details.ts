import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const getSegmentDetailsTool = createBaseTool({
  description: "Get detailed information about a specific segment",
  inputSchema: z.object({
    id: z.number().describe("The segment ID"),
  }),
  outputSchema: z.object({
    id: z.number(),
    name: z.string(),
    activity_type: z.string(),
    distance: z.number(),
    average_grade: z.number(),
    maximum_grade: z.number(),
    elevation_high: z.number(),
    elevation_low: z.number(),
    start_latlng: z.array(z.number()),
    end_latlng: z.array(z.number()),
    climb_category: z.number(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    private: z.boolean(),
    starred: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
    total_elevation_gain: z.number(),
    effort_count: z.number(),
    athlete_count: z.number(),
    star_count: z.number(),
    athlete_segment_stats: z.object({
      pr_elapsed_time: z.number(),
      pr_date: z.string(),
      effort_count: z.number(),
    }),
  }),
});
