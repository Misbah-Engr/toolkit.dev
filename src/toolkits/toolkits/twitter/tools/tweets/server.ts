import type { ServerToolConfig } from "@/toolkits/types";
import { getLatestTweetsTool } from "./base";
import { TwitterApi } from "twitter-api-v2";

export const getLatestTweetsToolConfigServer = (
  clientId: string,
  clientSecret: string,
): ServerToolConfig => {
  return {
    callback: async (args: any) => {
      const {
        username,
        max_results = 10,
        exclude_retweets = false,
        exclude_replies = false,
      } = args;
      const client = new TwitterApi({
        clientId,
        clientSecret,
      });

      // First get the user ID
      const user = await client.v2.userByUsername(username);
      if (!user.data) {
        throw new Error(`User ${username} not found`);
      }

      const userId = user.data.id;

      // Get tweets
      const tweets = await client.v2.userTimeline(userId, {
        max_results,
        "tweet.fields": [
          "created_at",
          "public_metrics",
          "entities",
          "referenced_tweets",
          "in_reply_to_user_id",
        ],
        exclude: [
          ...(exclude_retweets ? ["retweets" as const] : []),
          ...(exclude_replies ? ["replies" as const] : []),
        ],
      });

      return {
        tweets:
          tweets.data.data?.map((tweet) => ({
            id: tweet.id,
            text: tweet.text,
            created_at: tweet.created_at || new Date().toISOString(),
            public_metrics: {
              retweet_count: tweet.public_metrics?.retweet_count || 0,
              reply_count: tweet.public_metrics?.reply_count || 0,
              like_count: tweet.public_metrics?.like_count || 0,
              quote_count: tweet.public_metrics?.quote_count || 0,
            },
            entities: tweet.entities
              ? {
                  urls: tweet.entities.urls?.map((url) => ({
                    url: url.url,
                    expanded_url: url.expanded_url,
                    display_url: url.display_url,
                  })),
                  hashtags: tweet.entities.hashtags?.map((hashtag) => ({
                    tag: hashtag.tag,
                  })),
                  mentions: tweet.entities.mentions?.map((mention) => ({
                    username: mention.username,
                  })),
                }
              : undefined,
            in_reply_to_user_id: tweet.in_reply_to_user_id || null,
            referenced_tweets: tweet.referenced_tweets?.map((ref) => ({
              type: ref.type,
              id: ref.id,
            })),
          })) || [],
        meta: {
          result_count: tweets.data.data?.length || 0,
          next_token: tweets.data.meta?.next_token,
        },
      };
    },
  };
};
