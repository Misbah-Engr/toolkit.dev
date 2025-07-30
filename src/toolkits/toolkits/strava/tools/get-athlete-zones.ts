import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const getAthleteZonesTool = createBaseTool({
  description: "Get the authenticated athlete's heart rate and power zones",
  inputSchema: z.object({}),
  outputSchema: z.object({
    heart_rate: z
      .object({
        custom_zones: z.boolean(),
        zones: z.array(
          z.object({
            min: z.number(),
            max: z.number(),
          }),
        ),
      })
      .optional(),
    power: z
      .object({
        zones: z.array(
          z.object({
            min: z.number(),
            max: z.number(),
          }),
        ),
      })
      .optional(),
  }),
});
