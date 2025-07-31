import { z } from "zod";

import { createBaseTool } from "@/toolkits/create-tool";

import type { DetailedAthlete } from "strava";

export const getAthleteBase = createBaseTool({
  description:
    "Get the authenticated athlete's profile information from Strava",
  inputSchema: z.object({}),
  outputSchema: z.object({
    athlete: z.custom<DetailedAthlete>(),
  }),
});
