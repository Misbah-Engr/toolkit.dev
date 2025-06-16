import type {
  Client,
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client";
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

        const databases = response.results
          .filter((item) => item.object === "database" && "title" in item)
          .map((db: DatabaseObjectResponse) => ({
            id: db.id,
            title: db.title?.[0]?.plain_text ?? "Untitled Database",
            description: db.description?.[0]?.plain_text,
            created_time: db.created_time,
            last_edited_time: db.last_edited_time,
            url: db.url,
            properties: db.properties,
          }));

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
    message: "Successfully retrieved databases from your Notion workspace.",
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
          start_cursor: start_cursor ?? undefined,
          page_size,
        });

        const results = response.results
          .filter((page) => page.object === "page" && "properties" in page)
          .map((page: PageObjectResponse) => ({
            id: page.id,
            properties: page.properties,
            created_time: page.created_time,
            last_edited_time: page.last_edited_time,
            url: page.url,
          }));

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
    message: "Successfully queried the database.",
  };
};
