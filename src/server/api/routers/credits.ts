import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { env } from "@/env";

import { IS_DEVELOPMENT } from "@/lib/constants";

export const creditsRouter = createTRPCRouter({
  getAvailableCredits: protectedProcedure.query(async () => {
    if (!IS_DEVELOPMENT) {
      return {
        totalCredits: 0,
        totalUsage: 0,
      };
    }

    if (!env.OPENROUTER_API_KEY) {
      throw new Error("OPENROUTER_API_KEY is not set");
    }

    const response = await fetch("https://openrouter.ai/api/v1/credits", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
      },
    });

    const {
      data: { total_credits, total_usage },
    } = (await response.json()) as {
      data: {
        total_credits: number;
        total_usage: number;
      };
    };

    return {
      totalCredits: total_credits,
      totalUsage: total_usage,
    };
  }),
});
