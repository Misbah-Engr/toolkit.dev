import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const getBlocksTool = createBaseTool({
  description: "Retrieve block content from a page or block",
  inputSchema: z.object({
    block_id: z
      .string()
      .describe("The ID of the block or page to retrieve children from"),
    start_cursor: z
      .string()
      .describe("Pagination cursor to start from (blank for first page)"),
    page_size: z
      .number()
      .max(100)
      .describe("Number of results per page (max 100, default 10)"),
  }),
  outputSchema: z.object({
    results: z.array(
      z.object({
        id: z.string(),
        type: z.string(),
        created_time: z.string(),
        last_edited_time: z.string(),
        has_children: z.boolean(),
        archived: z.boolean(),
        content: z
          .record(z.unknown())
          .describe("Block-specific content based on type"),
      }),
    ),
    has_more: z.boolean(),
    next_cursor: z.string().optional(),
  }),
});
