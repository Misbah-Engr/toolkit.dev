import { z } from "zod";
import { createBaseTool } from "@/mcp/create-tool";

const searchToolInputSchema = z.object({
  query: z.string().min(1).max(100),
});

const outputSchema = z.object({
  results: z.array(
    z.object({
      title: z.string().nullable(),
      url: z.string().url(),
      content: z.string(),
      publishedDate: z.string().optional(),
      image: z.string().optional(),
      favicon: z.string().optional(),
      score: z.number().optional(),
      author: z.string().optional(),
    }),
  ),
});

export const baseSearchTool = createBaseTool({
  description: "Search the web for up-to-date information",
  inputSchema: searchToolInputSchema,
  outputSchema,
});

export type ExaSearchToolArgs = z.infer<typeof searchToolInputSchema>;
export type ExaSearchToolResult = z.infer<typeof outputSchema>;
