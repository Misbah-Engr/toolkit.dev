import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const getRoutesTool = createBaseTool({
  description: "Get the authenticated athlete's routes (requires Premium)",
  inputSchema: z.object({
    page: z.number().optional().describe("Page number for pagination"),
    per_page: z.number().optional().describe("Number of routes per page"),
  }),
  outputSchema: z.object({
    routes: z.array(z.object({
      athlete: z.object({
        id: z.number(),
        firstname: z.string(),
        lastname: z.string(),
      }),
      description: z.string(),
      distance: z.number(),
      elevation_gain: z.number(),
      id: z.number(),
      id_str: z.string(),
      map: z.object({
        id: z.string(),
        polyline: z.string(),
        summary_polyline: z.string(),
      }),
      name: z.string(),
      private: z.boolean(),
      starred: z.boolean(),
      timestamp: z.number(),
      type: z.number(),
      sub_type: z.number(),
      created_at: z.string(),
      updated_at: z.string(),
      estimated_moving_time: z.number(),
      segments: z.array(z.object({
        id: z.number(),
        name: z.string(),
        activity_type: z.string(),
        distance: z.number(),
        average_grade: z.number(),
        maximum_grade: z.number(),
        elevation_high: z.number(),
        elevation_low: z.number(),
      })).optional(),
    })),
  }),
}); 