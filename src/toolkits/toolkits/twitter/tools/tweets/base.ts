import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const getLatestTweetsTool = createBaseTool({
  description: "Get the latest tweets from a Twitter user (up to 100 tweets)",
  inputSchema: z.object({
    username: z
      .string()
      .describe(
        "Twitter username (without @ symbol). Example: 'elonmusk', 'twitter'",
      ),
    max_results: z
      .number()
      .min(1)
      .max(100)
      .default(10)
      .describe("Number of tweets to retrieve (max 100, default 10)"),
    exclude_retweets: z
      .boolean()
      .default(false)
      .describe("Exclude retweets from results"),
    exclude_replies: z
      .boolean()
      .default(false)
      .describe("Exclude replies from results"),
  }),
  outputSchema: z.object({
    tweets: z.array(
      z.object({
        id: z.string(),
        text: z.string(),
        created_at: z.string(),
        public_metrics: z.object({
          retweet_count: z.number(),
          reply_count: z.number(),
          like_count: z.number(),
          quote_count: z.number(),
        }),
        entities: z
          .object({
            urls: z
              .array(
                z.object({
                  url: z.string(),
                  expanded_url: z.string(),
                  display_url: z.string(),
                }),
              )
              .optional(),
            hashtags: z
              .array(
                z.object({
                  tag: z.string(),
                }),
              )
              .optional(),
            mentions: z
              .array(
                z.object({
                  username: z.string(),
                }),
              )
              .optional(),
          })
          .optional(),
        in_reply_to_user_id: z.string().nullable(),
        referenced_tweets: z
          .array(
            z.object({
              type: z.enum(["retweeted", "replied_to", "quoted"]),
              id: z.string(),
            }),
          )
          .optional(),
      }),
    ),
    meta: z.object({
      result_count: z.number(),
      next_token: z.string().optional(),
    }),
  }),
});
