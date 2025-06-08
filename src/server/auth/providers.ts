import { env } from "@/env";

import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import type { Provider } from "next-auth/providers";

export const createProviders = () => {
  const providers: Provider[] = [];

  if ("AUTH_DISCORD_ID" in env && "AUTH_DISCORD_SECRET" in env) {
    providers.push(
      DiscordProvider({
        clientId: env.AUTH_DISCORD_ID,
        clientSecret: env.AUTH_DISCORD_SECRET,
      }),
    );
  }

  if ("AUTH_GOOGLE_ID" in env && "AUTH_GOOGLE_SECRET" in env) {
    providers.push(
      GoogleProvider({
        clientId: env.AUTH_GOOGLE_ID,
        clientSecret: env.AUTH_GOOGLE_SECRET,
      }),
    );
  }

  if ("AUTH_GITHUB_ID" in env && "AUTH_GITHUB_SECRET" in env) {
    providers.push(
      GithubProvider({
        clientId: env.AUTH_GITHUB_ID,
        clientSecret: env.AUTH_GITHUB_SECRET,
      }),
    );
  }

  return providers;
};
