import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const baseAddMemoryTool = createBaseTool({
  description: "Add a new memory. This method is called everytime the user informs anything about themselves, their preferences, or anything that has any relevant information which can be useful in the future conversation. This can also be called when the user asks you to remember something.",
  inputSchema: z.object({
    content: z.string().min(1).describe("The content to store in memory"),
    userId: z.string().default("mem0-mcp-user").describe("User ID for memory storage. If not provided explicitly, use a generic user ID like 'mem0-mcp-user'"),
  }),
  outputSchema: z.object({
    success: z.boolean(),
    message: z.string(),
  }),
});