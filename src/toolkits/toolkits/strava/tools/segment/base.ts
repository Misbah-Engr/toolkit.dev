import { z } from "zod";

import { createBaseTool } from "@/toolkits/create-tool";

import type { DetailedSegment } from "strava";

export const getSegmentDetailsBase = createBaseTool({
  description: "Get detailed information about a specific segment",
  inputSchema: z.object({
    id: z.number().describe("The segment ID"),
  }),
  outputSchema: z.object({
    segment: z.custom<DetailedSegment>(),
  }),
});
