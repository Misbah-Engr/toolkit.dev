import { type baseAddMemoryTool } from "./base";
import { env } from "@/env";
import { MemoryClient } from "mem0ai";
import type { ServerToolConfig } from "@/toolkits/types";

export const mem0AddMemoryToolConfigServer: ServerToolConfig<
  typeof baseAddMemoryTool.inputSchema.shape,
  typeof baseAddMemoryTool.outputSchema.shape
> = {
  callback: async ({ content, userId }) => {
    if (!env.MEM0_API_KEY) {
      throw new Error("MEM0_API_KEY is not set");
    }

    const memoryClient = new MemoryClient({ apiKey: env.MEM0_API_KEY });

    try {
      const messages = [
        { role: 'system', content: 'Memory storage system' },
        { role: 'user', content }
      ];
      
      await memoryClient.add(messages, { user_id: userId });
      
      return {
        success: true,
        message: "Memory added successfully",
      };
    } catch (error) {
      console.error('Error adding memory:', error);
      return {
        success: false,
        message: `Failed to add memory: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  },
  message: "Memory has been successfully stored and will be used to provide more personalized responses in future conversations.",
};