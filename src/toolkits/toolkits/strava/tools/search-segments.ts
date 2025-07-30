import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const searchSegmentsTool = createBaseTool({
  description: "Search for segments within geographical bounds",
  inputSchema: z.object({
    bounds: z
      .string()
      .describe(
        "Comma-delimited list of lat/lng bounds: sw_lat,sw_lng,ne_lat,ne_lng",
      ),
    activity_type: z
      .enum(["running", "riding"])
      .optional()
      .describe("Filter by activity type"),
  }),
  outputSchema: z.object({
    segments: z.array(
      z.object({
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
      }),
    ),
  }),
});
