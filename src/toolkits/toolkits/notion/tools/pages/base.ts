import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const getPageTool = createBaseTool({
  description: "Retrieve page content and metadata by page ID",
  inputSchema: z.object({
    page_id: z.string().describe("The ID of the page to retrieve"),
  }),
  outputSchema: z.object({
    id: z.string(),
    created_time: z.string(),
    last_edited_time: z.string(),
    url: z.string(),
    archived: z.boolean(),
    properties: z.record(z.unknown()),
    parent: z.record(z.unknown()),
  }),
});

export const searchPagesTool = createBaseTool({
  description: "Search for pages by title or content",
  inputSchema: z.object({
    query: z.string().describe("Search query to find pages"),
    filter: z.record(z.unknown()).optional().describe("Additional filter criteria"),
    sort: z.record(z.unknown()).optional().describe("Sort criteria"),
    start_cursor: z.string().optional().describe("Pagination cursor to start from"),
    page_size: z.number().max(100).optional().describe("Number of results per page (max 100)"),
  }),
  outputSchema: z.object({
    results: z.array(
      z.object({
        id: z.string(),
        properties: z.record(z.unknown()),
        created_time: z.string(),
        last_edited_time: z.string(),
        url: z.string(),
        archived: z.boolean(),
      })
    ),
    has_more: z.boolean(),
    next_cursor: z.string().optional(),
  }),
});