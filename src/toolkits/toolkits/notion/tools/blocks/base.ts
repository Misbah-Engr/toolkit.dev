import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

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
    results: z.array(z.custom<BlockObjectResponse>()),
    has_more: z.boolean(),
    next_cursor: z.string().optional(),
  }),
});

export const appendBlocksTool = createBaseTool({
  description: "Append new blocks to a page or existing block",
  inputSchema: z.object({
    block_id: z
      .string()
      .describe("The ID of the parent block or page to append blocks to"),
    content: z
      .string()
      .describe("Markdown content to convert and append as blocks"),
    block_type: z
      .enum([
        "paragraph",
        "heading_1",
        "heading_2",
        "heading_3",
        "bulleted_list_item",
        "numbered_list_item",
        "to_do",
        "code",
      ])
      .describe("Type of block to create (defaults to paragraph)"),
  }),
  outputSchema: z.object({
    results: z.array(z.custom<BlockObjectResponse>()),
  }),
});
