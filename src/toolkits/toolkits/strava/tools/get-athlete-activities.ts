import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const getAthleteActivitiesTool = createBaseTool({
  description:
    "Get the authenticated athlete's activities with filtering options",
  inputSchema: z.object({
    page: z.number().optional().describe("Page number for pagination"),
    per_page: z
      .number()
      .optional()
      .describe("Number of activities per page (max 200)"),
    before: z
      .number()
      .optional()
      .describe("Seconds since Unix epoch to filter activities before"),
    after: z
      .number()
      .optional()
      .describe("Seconds since Unix epoch to filter activities after"),
  }),
  outputSchema: z.object({
    activities: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
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
      }),
    ),
  }),
});
