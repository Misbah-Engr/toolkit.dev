import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const getPageTool = createBaseTool({
  description: "Retrieve page content and metadata by page ID",
  inputSchema: z.object({
    page_id: z.string().describe("The ID of the page to retrieve"),
  }),
  outputSchema: z.object({
    page: z.custom<PageObjectResponse>(),
  }),
});

export const searchPagesTool = createBaseTool({
  description: "Search for pages by title or content",
  inputSchema: z.object({
    query: z.string().describe("Search query to find pages"),
    start_cursor: z
      .string()
      .describe("Pagination cursor to start from (blank for first page)"),
    page_size: z
      .number()
      .max(100)
      .describe("Number of results per page (max 100, default 10)"),
  }),
  outputSchema: z.object({
    results: z.array(z.custom<PageObjectResponse>()),
    has_more: z.boolean(),
    next_cursor: z.string().optional(),
  }),
});
