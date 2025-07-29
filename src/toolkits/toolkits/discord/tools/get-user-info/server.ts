import { getUserInfoTool } from "./base";
import { api } from "@/trpc/server";
import type { ServerToolConfig } from "@/toolkits/types";

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

        const response = await fetch('https://discord.com/api/v10/users/@me', {
          headers: {
            Authorization: `Bearer ${account.access_token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Discord API error: ${response.status} ${response.statusText}`);
        }

        const user = await response.json();
        
        return {
          success: true,
          user: {
            id: user.id,
            username: user.username,
            discriminator: user.discriminator,
            avatar: user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : undefined,
            email: user.email,
            verified: user.verified,
            nitro: user.premium_type > 0,
            createdAt: user.created_at,
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