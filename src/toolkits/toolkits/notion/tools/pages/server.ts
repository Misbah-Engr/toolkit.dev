import type { Client } from "@notionhq/client";
import type { ServerToolConfig } from "@/toolkits/types";
import type { getPageTool, searchPagesTool } from "./base";

export const notionGetPageToolConfigServer = (
  notion: Client,
): ServerToolConfig<
  typeof getPageTool.inputSchema.shape,
  typeof getPageTool.outputSchema.shape
> => {
  return {
    callback: async ({ page_id }) => {
      try {
        const response = await notion.pages.retrieve({
          page_id,
        });

        if (
          response.object !== "page" ||
          !("created_time" in response) ||
          !("last_edited_time" in response) ||
          !("url" in response) ||
          !("archived" in response)
        ) {
          throw new Error("Page not found");
        }

        return {
          id: response.id,
          created_time: response.created_time,
          last_edited_time: response.last_edited_time,
          url: response.url,
          archived: response.archived,
          properties: response.properties,
          parent: response.parent,
        };
      } catch (error) {
        console.error("Notion API error:", error);
        throw new Error("Failed to retrieve page from Notion");
      }
    },
    message: "Successfully retrieved page details.",
  };
};

export const notionSearchPagesToolConfigServer = (
  notion: Client,
): ServerToolConfig<
  typeof searchPagesTool.inputSchema.shape,
  typeof searchPagesTool.outputSchema.shape
> => {
  return {
    callback: async ({ query, start_cursor, page_size = 100 }) => {
      try {
        const response = await notion.search({
          query,
          filter: {
            value: "page",
            property: "object",
          },
          sort: {
            direction: "ascending",
            timestamp: "last_edited_time",
          },
          start_cursor: start_cursor || undefined,
          page_size,
        });

        console.log(response.results);

        const results = response.results
          .filter((item) => item.object === "page" && "properties" in item)
          .map((page) => ({
            id: page.id,
            properties: page.properties,
            created_time: page.created_time,
            last_edited_time: page.last_edited_time,
            url: page.url,
            archived: page.archived,
          }));

        return {
          results,
          has_more: response.has_more,
          next_cursor: response.next_cursor ?? undefined,
        };
      } catch (error) {
        console.error("Notion API error:", error);
        throw new Error("Failed to search pages in Notion");
      }
    },
    message: "Successfully searched pages in your Notion workspace.",
  };
};
