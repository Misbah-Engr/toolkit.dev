import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const getTracksBase = createBaseTool({
  description: "Get the user's saved tracks from Spotify.",
  inputSchema: z.object({
    limit: z.number().min(1).max(50).optional().describe("The maximum number of items to return. Default: 20. Min: 1. Max: 50."),
    offset: z.number().min(0).optional().describe("The index of the first track to return. Default: 0."),
  }),
  outputSchema: z.object({
    tracks: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        url: z.string().url(),
        album: z.object({
          id: z.string(),
          name: z.string(),
          url: z.string().url(),
          image: z.string().url().optional(),
          images: z.array(
            z.object({
              url: z.string().url(),
              height: z.number().nullable(),
              width: z.number().nullable(),
            })
          ),
        }),
        artists: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            url: z.string().url(),
          })
        ),
        duration_ms: z.number(),
        popularity: z.number(),
        explicit: z.boolean(),
        uri: z.string(),
        added_at: z.string(),
      })
    ),
  }),
});