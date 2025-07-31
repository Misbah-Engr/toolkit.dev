import { z } from "zod";

import { createBaseTool } from "@/toolkits/create-tool";

import type { DetailedSegment } from "strava";

export const exploreSegmentsBase = createBaseTool({
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
    segments: z.array(z.custom<DetailedSegment>()),
  }),
});
