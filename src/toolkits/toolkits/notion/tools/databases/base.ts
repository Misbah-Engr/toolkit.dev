import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";
import type {
  PageObjectResponse,
  DatabaseObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

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
    databases: z.array(z.custom<DatabaseObjectResponse>()),
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
      z.union([
        z.custom<PageObjectResponse>(),
        z.custom<DatabaseObjectResponse>(),
      ]),
    ),
    has_more: z.boolean(),
    next_cursor: z.string().optional(),
  }),
});

export const createDatabaseTool = createBaseTool({
  description:
    "Create a new database in Notion workspace or as a child of a page",
  inputSchema: z.object({
    parent_page_id: z
      .string()
      .describe("ID of parent page where the database will be created"),
    title: z.string().describe("Title of the new database"),
    description: z
      .string()
      .describe(
        "Description of the database (empty string for no description)",
      ),
  }),
  outputSchema: z.object({
    database: z.custom<DatabaseObjectResponse>(),
  }),
});
