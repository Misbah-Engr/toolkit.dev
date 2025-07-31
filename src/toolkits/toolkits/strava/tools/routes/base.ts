import { z } from "zod";

import { createBaseTool } from "@/toolkits/create-tool";

import type { Route } from "strava";

export const getRoutesBase = createBaseTool({
  description: "Get the authenticated athlete's routes (requires Premium)",
  inputSchema: z.object({
    page: z.number().optional().describe("Page number for pagination"),
    per_page: z.number().optional().describe("Number of routes per page"),
  }),
  outputSchema: z.object({
    routes: z.array(z.custom<Route>()),
  }),
});
