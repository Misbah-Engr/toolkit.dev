import { z } from "zod";

import { createBaseTool } from "@/toolkits/create-tool";

import type { SummaryActivity } from "strava";

export const getActivitiesBase = createBaseTool({
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
    activities: z.array(z.custom<SummaryActivity>()),
  }),
});
