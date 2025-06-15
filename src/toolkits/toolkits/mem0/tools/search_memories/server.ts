import { type baseSearchMemoriesTool } from "./base";
import { env } from "@/env";
import { MemoryClient } from "mem0ai";
import type { ServerToolConfig } from "@/toolkits/types";

export const mem0SearchMemoriesToolConfigServer: ServerToolConfig<
  typeof baseSearchMemoriesTool.inputSchema.shape,
  typeof baseSearchMemoriesTool.outputSchema.shape
> = {
  callback: async ({ query, userId }) => {
    if (!env.MEM0_API_KEY) {
      throw new Error("MEM0_API_KEY is not set");
    }

    const memoryClient = new MemoryClient({ apiKey: env.MEM0_API_KEY });

    try {
      const results = await memoryClient.search(query, { user_id: userId });
      
      return {
        memories: results.map((result: any) => ({
          memory: result.memory,
          score: result.score,
          metadata: result.metadata,
        })),
        message: results.length > 0 
          ? `Found ${results.length} relevant memories` 
          : "No memories found matching your query",
      };
    } catch (error) {
      console.error('Error searching memories:', error);
      return {
        memories: [],
        message: `Failed to search memories: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  },
  message: "These are the relevant memories found. Use this information to provide contextual and personalized responses to the user.",
};