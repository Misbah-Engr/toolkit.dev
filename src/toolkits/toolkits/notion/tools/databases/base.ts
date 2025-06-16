import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";
import type { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";

export const listDatabasesTool = createBaseTool({
  description: "List all databases the integration has access to",
  inputSchema: z.object({
    start_cursor: z
      .string()
      .describe("Pagination cursor to start from (blank for first page)"),
    page_size: z
      .number()
      .max(100)
      .describe("Number of results per page (max 100)"),
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
      }),
    ),
    has_more: z.boolean(),
    next_cursor: z.string().optional(),
  }),
});

export const queryDatabaseTool = createBaseTool({
  description:
    "Query a database with optional filtering, sorting, and pagination",
  inputSchema: z.object({
    database_id: z.string().describe("The ID of the database to query"),
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
        properties: z.record(z.unknown()),
        created_time: z.string(),
        last_edited_time: z.string(),
        url: z.string(),
      }),
    ),
    has_more: z.boolean(),
    next_cursor: z.string().optional(),
  }),
});
