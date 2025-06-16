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

export const createPageTool = createBaseTool({
  description: "Create a new page in Notion workspace or as a child of another page",
  inputSchema: z.object({
    parent_page_id: z.string().optional().describe("ID of parent page (if creating a child page)"),
    parent_database_id: z.string().optional().describe("ID of parent database (if creating a database entry)"),
    title: z.string().describe("Title of the new page"),
    content: z.string().optional().describe("Markdown content to add to the page"),
    properties: z.record(z.any()).optional().describe("Page properties (for database pages)"),
  }),
  outputSchema: z.object({
    page: z.custom<PageObjectResponse>(),
  }),
});
