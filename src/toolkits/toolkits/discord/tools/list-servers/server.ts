import { type listServersTool } from "./base";
import { api } from "@/trpc/server";
import type { ServerToolConfig } from "@/toolkits/types";

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

        const response = await fetch('https://discord.com/api/v10/users/@me/guilds', {
          headers: {
            Authorization: `Bearer ${account.access_token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Discord API error: ${response.status} ${response.statusText}`);
        }

        const guilds = await response.json();
        
        return {
          success: true,
          servers: guilds.map((guild: any) => ({
            id: guild.id,
            name: guild.name,
            icon: guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : undefined,
            memberCount: guild.approximate_member_count,
            owner: guild.owner === true,
          })),
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