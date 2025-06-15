import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const listDatabasesTool = createBaseTool({
  description: "List all databases the integration has access to",
  inputSchema: z.object({
    start_cursor: z.string().optional().describe("Pagination cursor to start from"),
    page_size: z.number().max(100).optional().describe("Number of results per page (max 100)"),
  }),
  outputSchema: z.object({
    databases: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().optional(),
        created_time: z.string(),
        last_edited_time: z.string(),
        url: z.string(),
        properties: z.record(z.unknown()),
      })
    ),
    has_more: z.boolean(),
    next_cursor: z.string().optional(),
  }),
});

export const queryDatabaseTool = createBaseTool({
  description: "Query a database with optional filtering, sorting, and pagination",
  inputSchema: z.object({
    database_id: z.string().describe("The ID of the database to query"),
    filter: z.record(z.unknown()).optional().describe("Filter criteria for the query"),
    sorts: z.array(z.record(z.unknown())).optional().describe("Sort criteria for the query"),
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
      })
    ),
    has_more: z.boolean(),
    next_cursor: z.string().optional(),
  }),
});