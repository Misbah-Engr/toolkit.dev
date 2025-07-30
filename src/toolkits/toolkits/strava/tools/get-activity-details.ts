import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const getActivityDetailsTool = createBaseTool({
  description: "Get detailed information about a specific activity",
  inputSchema: z.object({
    id: z.number().describe("The activity ID"),
    include_all_efforts: z
      .boolean()
      .optional()
      .describe("Include all segment efforts"),
  }),
  outputSchema: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    distance: z.number(),
    moving_time: z.number(),
    elapsed_time: z.number(),
    total_elevation_gain: z.number(),
    type: z.string(),
    start_date: z.string(),
    start_date_local: z.string(),
    timezone: z.string(),
    average_speed: z.number(),
    max_speed: z.number(),
    average_cadence: z.number().optional(),
    average_heartrate: z.number().optional(),
    max_heartrate: z.number().optional(),
    kilojoules: z.number().optional(),
    calories: z.number().optional(),
    device_name: z.string().optional(),
    embed_token: z.string().optional(),
    splits_metric: z
      .array(
        z.object({
          distance: z.number(),
          elapsed_time: z.number(),
          elevation_difference: z.number(),
          moving_time: z.number(),
          split: z.number(),
          average_speed: z.number(),
          pace_zone: z.number(),
        }),
      )
      .optional(),
    segment_efforts: z
      .array(
        z.object({
          id: z.number(),
          elapsed_time: z.number(),
          start_date: z.string(),
          start_date_local: z.string(),
          distance: z.number(),
          is_kom: z.boolean(),
        }),
      )
      .optional(),
  }),
});
