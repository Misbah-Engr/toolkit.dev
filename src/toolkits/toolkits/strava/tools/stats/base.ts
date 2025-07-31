import { z } from "zod";

import { createBaseTool } from "@/toolkits/create-tool";

import type { ActivityStats } from "strava";

export const getAthleteStatsBase = createBaseTool({
  description: "Get the authenticated athlete's statistics",
  inputSchema: z.object({}),
  outputSchema: z.object({
    stats: z.custom<ActivityStats>(),
  }),
});
