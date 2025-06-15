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

        return {
          id: response.id,
          created_time: response.created_time,
          last_edited_time: response.last_edited_time,
          url: response.url,
          archived: response.archived,
          properties: (response as any).properties,
          parent: (response as any).parent,
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
    callback: async ({ query, filter, sort, start_cursor, page_size = 100 }) => {
      try {
        const response = await notion.search({
          query,
          filter: {
            value: "page",
            property: "object",
            ...filter,
          },
          sort,
          start_cursor,
          page_size,
        });

        const results = response.results
          .filter((item) => item.object === "page")
          .map((page: any) => ({
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