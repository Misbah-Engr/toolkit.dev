import { z } from "zod";

import { createBaseTool } from "@/toolkits/create-tool";

import type { Zones } from "strava";

export const getAthleteZonesBase = createBaseTool({
  description: "Get the authenticated athlete's heart rate and power zones",
  inputSchema: z.object({}),
  outputSchema: z.object({
    zones: z.custom<Zones>(),
  }),
});
