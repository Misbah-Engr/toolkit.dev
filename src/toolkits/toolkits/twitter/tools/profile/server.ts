import type { ServerToolConfig } from "@/toolkits/types";
import { getUserProfileTool } from "./base";
import { TwitterApi } from "twitter-api-v2";

export const getUserProfileToolConfigServer = (
  clientId: string,
  clientSecret: string,
): ServerToolConfig => {
  return {
    callback: async (args: any) => {
      const { username } = args;
      const client = new TwitterApi({
        clientId,
        clientSecret,
      });

      const user = await client.v2.userByUsername(username, {
        "user.fields": [
          "description",
          "location",
          "url",
          "public_metrics",
          "verified",
          "profile_image_url",
          "created_at",
        ],
      });

      if (!user.data) {
        throw new Error(`User ${username} not found`);
      }

      return {
        id: user.data.id,
        username: user.data.username,
        name: user.data.name,
        description: user.data.description || null,
        location: user.data.location || null,
        url: user.data.url || null,
        followers_count: user.data.public_metrics?.followers_count || 0,
        following_count: user.data.public_metrics?.following_count || 0,
        tweets_count: user.data.public_metrics?.tweet_count || 0,
        verified: user.data.verified || false,
        profile_image_url: user.data.profile_image_url || null,
        created_at: user.data.created_at || new Date().toISOString(),
      };
    },
  };
};
