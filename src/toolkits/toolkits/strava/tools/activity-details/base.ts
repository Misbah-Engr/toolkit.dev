import { z } from "zod";

import { createBaseTool } from "@/toolkits/create-tool";

import type { DetailedActivity } from "strava";

export const getActivityDetailsBase = createBaseTool({
  description: "Get detailed information about a specific activity",
  inputSchema: z.object({
    id: z.number().describe("The activity ID"),
    include_all_efforts: z
      .boolean()
      .optional()
      .describe("Include all segment efforts"),
  }),
  outputSchema: z.object({
    activity: z.custom<DetailedActivity>(),
  }),
});
