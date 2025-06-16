import type { Client } from "@notionhq/client";
import type { ServerToolConfig } from "@/toolkits/types";
import type { listDatabasesTool, queryDatabaseTool } from "./base";

export const notionListDatabasesToolConfigServer = (
  notion: Client,
): ServerToolConfig<
  typeof listDatabasesTool.inputSchema.shape,
  typeof listDatabasesTool.outputSchema.shape
> => {
  return {
    callback: async ({ start_cursor, page_size = 100 }) => {
      try {
        const response = await notion.search({
          filter: {
            value: "database",
            property: "object",
          },
          start_cursor: start_cursor || undefined,
          page_size,
        });

        const databases = response.results.filter(
          (item) => item.object === "database" && "title" in item,
        );

        return {
          databases,
          has_more: response.has_more,
          next_cursor: response.next_cursor ?? undefined,
        };
      } catch (error) {
        console.error("Notion API error:", error);
        throw new Error("Failed to fetch databases from Notion");
      }
    },
    message:
      "Successfully retrieved databases from your Notion workspace. The user is shown the responses in the UI. Do not reiterate them. If you called this tool because the user asked a question, answer the question.",
  };
};

export const notionQueryDatabaseToolConfigServer = (
  notion: Client,
): ServerToolConfig<
  typeof queryDatabaseTool.inputSchema.shape,
  typeof queryDatabaseTool.outputSchema.shape
> => {
  return {
    callback: async ({ database_id, start_cursor, page_size = 100 }) => {
      try {
        const response = await notion.databases.query({
          database_id,
          start_cursor: start_cursor || undefined,
          page_size,
        });

        const results = response.results.filter(
          (result) =>
            (result.object === "page" && "properties" in result) ||
            (result.object === "database" && "title" in result),
        );
        return {
          results,
          has_more: response.has_more,
          next_cursor: response.next_cursor ?? undefined,
        };
      } catch (error) {
        console.error("Notion API error:", error);
        throw new Error("Failed to query database from Notion");
      }
    },
    message:
      "Successfully queried the database. The user is shown the responses in the UI. Do not reiterate them. If you called this tool because the user asked a question, answer the question.",
  };
};
