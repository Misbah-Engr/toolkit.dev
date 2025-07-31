import { type getUserInfoTool } from "./base";
import { api } from "@/trpc/server";
import type { ServerToolConfig } from "@/toolkits/types";
import { Client, GatewayIntentBits, User } from "discord.js";

export const getUserInfoToolConfigServer = (): ServerToolConfig<
  typeof getUserInfoTool.inputSchema.shape,
  typeof getUserInfoTool.outputSchema.shape
> => {
  return {
    callback: async () => {
      try {
        const account = await api.accounts.getAccountByProvider("discord");

        if (!account) {
          throw new Error("No Discord account found. Please connect your Discord account first.");
        }

        if (!account.access_token) {
          throw new Error("No access token available for Discord account.");
        }

        // Create a Discord client instance
        const client = new Client({
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
          ],
        });

        // Login using the access token
        await client.login(account.access_token);

        // Wait for the client to be ready
        await new Promise<void>((resolve) => {
          client.once('ready', () => resolve());
        });

        // Get the current user
        const user = client.user;
        
        if (!user) {
          throw new Error("Failed to get user information from Discord");
        }

        // Fetch full user data
        const fullUser = await user.fetch();
        
        return {
          success: true,
          user: {
            id: fullUser.id,
            username: fullUser.username,
            discriminator: fullUser.discriminator,
            avatar: fullUser.displayAvatarURL() || undefined,
            email: undefined, // Email not available through bot API
            verified: false, // Verification status not available through bot API
            nitro: false, // Nitro status not available through bot API
            createdAt: fullUser.createdAt.toISOString(),
          },
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    },
    message: (result) => {
      if (result.success && result.user) {
        return `👤 Retrieved profile for ${result.user.username}`;
      } else {
        return `❌ Failed to load profile: ${result.error}`;
      }
    },
  };
}; 