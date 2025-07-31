import { type listServersTool } from "./base";
import { api } from "@/trpc/server";
import type { ServerToolConfig } from "@/toolkits/types";
import { Client, GatewayIntentBits, Guild } from "discord.js";

export const listServersToolConfigServer = (): ServerToolConfig<
  typeof listServersTool.inputSchema.shape,
  typeof listServersTool.outputSchema.shape
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

        // Get all guilds the user is a member of
        const guilds = client.guilds.cache.map((guild: Guild) => ({
          id: guild.id,
          name: guild.name,
          icon: guild.iconURL() || undefined,
          memberCount: guild.memberCount || undefined,
          owner: guild.ownerId === client.user?.id,
        }));

        // Destroy the client to clean up
        client.destroy();

        return {
          success: true,
          servers: guilds,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    },
    message: (result) => {
      if (result.success && result.servers) {
        return `📋 Found ${result.servers.length} Discord servers you're a member of`;
      } else {
        return `❌ Failed to load servers: ${result.error}`;
      }
    },
  };
}; 