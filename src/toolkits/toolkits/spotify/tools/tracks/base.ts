import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";
import type { SavedTrack } from "@spotify/web-api-ts-sdk";

export const getTracksBase = createBaseTool({
  description: "Get the user's saved tracks from Spotify.",
  inputSchema: z.object({
    limit: z
      .number()
      .min(1)
      .max(50)
      .optional()
      .describe(
        "The maximum number of items to return. Default: 20. Min: 1. Max: 50.",
      ),
    offset: z
      .number()
      .min(0)
      .optional()
      .describe("The index of the first track to return. Default: 0."),
  }),
  outputSchema: z.object({
    tracks: z.array(z.custom<SavedTrack>()),
  }),
});
