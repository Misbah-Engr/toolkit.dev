import { env } from "@/env";

import DiscordProvider, {
  type DiscordProfile,
} from "next-auth/providers/discord";
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google";
import GithubProvider, { type GitHubProfile } from "next-auth/providers/github";

import type { OAuthConfig, OIDCConfig, Provider } from "next-auth/providers";

export const providers: (
  | OAuthConfig<DiscordProfile>
  | OAuthConfig<GoogleProfile>
  | OAuthConfig<GitHubProfile>
)[] = [
  ...("AUTH_DISCORD_ID" in env && "AUTH_DISCORD_SECRET" in env
    ? [
        DiscordProvider({
          clientId: env.AUTH_DISCORD_ID,
          clientSecret: env.AUTH_DISCORD_SECRET,
        }),
      ]
    : []),
  ...("AUTH_GOOGLE_ID" in env && "AUTH_GOOGLE_SECRET" in env
    ? [
        GoogleProvider({
          clientId: env.AUTH_GOOGLE_ID,
          clientSecret: env.AUTH_GOOGLE_SECRET,
        }),
      ]
    : []),
  ...("AUTH_GITHUB_ID" in env && "AUTH_GITHUB_SECRET" in env
    ? [
        GithubProvider({
          clientId: env.AUTH_GITHUB_ID,
          clientSecret: env.AUTH_GITHUB_SECRET,
        }),
      ]
    : []),
];
