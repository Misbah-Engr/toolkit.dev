import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const getAthleteStatsTool = createBaseTool({
  description: "Get the authenticated athlete's statistics",
  inputSchema: z.object({}),
  outputSchema: z.object({
    recent_ride_totals: z.object({
      count: z.number(),
      distance: z.number(),
      moving_time: z.number(),
      elapsed_time: z.number(),
      elevation_gain: z.number(),
      achievement_count: z.number(),
    }),
    recent_run_totals: z.object({
      count: z.number(),
      distance: z.number(),
      moving_time: z.number(),
      elapsed_time: z.number(),
      elevation_gain: z.number(),
      achievement_count: z.number(),
    }),
    recent_swim_totals: z.object({
      count: z.number(),
      distance: z.number(),
      moving_time: z.number(),
      elapsed_time: z.number(),
      elevation_gain: z.number(),
      achievement_count: z.number(),
    }),
    ytd_ride_totals: z.object({
      count: z.number(),
      distance: z.number(),
      moving_time: z.number(),
      elapsed_time: z.number(),
      elevation_gain: z.number(),
    }),
    ytd_run_totals: z.object({
      count: z.number(),
      distance: z.number(),
      moving_time: z.number(),
      elapsed_time: z.number(),
      elevation_gain: z.number(),
    }),
    ytd_swim_totals: z.object({
      count: z.number(),
      distance: z.number(),
      moving_time: z.number(),
      elapsed_time: z.number(),
      elevation_gain: z.number(),
    }),
    all_ride_totals: z.object({
      count: z.number(),
      distance: z.number(),
      moving_time: z.number(),
      elapsed_time: z.number(),
      elevation_gain: z.number(),
    }),
    all_run_totals: z.object({
      count: z.number(),
      distance: z.number(),
      moving_time: z.number(),
      elapsed_time: z.number(),
      elevation_gain: z.number(),
    }),
    all_swim_totals: z.object({
      count: z.number(),
      distance: z.number(),
      moving_time: z.number(),
      elapsed_time: z.number(),
      elevation_gain: z.number(),
    }),
  }),
}); 