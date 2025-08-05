import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const getUserProfileTool = createBaseTool({
  description: "Get Twitter user profile information by username",
  inputSchema: z.object({
    username: z
      .string()
      .describe(
        "Twitter username (without @ symbol). Example: 'elonmusk', 'twitter'",
      ),
  }),
  outputSchema: z.object({
    id: z.string(),
    username: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    location: z.string().nullable(),
    url: z.string().nullable(),
    followers_count: z.number(),
    following_count: z.number(),
    tweets_count: z.number(),
    verified: z.boolean(),
    profile_image_url: z.string().nullable(),
    created_at: z.string(),
  }),
});
