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
          page: response,
        };
      } catch (error) {
        console.error("Notion API error:", error);
        throw new Error("Failed to retrieve page from Notion");
      }
    },
    message:
      "Successfully retrieved page details. The user is shown the responses in the UI. Do not reiterate them. If you called this tool because the user asked a question, answer the question.",
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

        const results = response.results
          .filter((item) => item.object === "page" && "properties" in item)
          .map((page) => page);

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
    message:
      "Successfully searched pages in your Notion workspace. The user is shown the responses in the UI. Do not reiterate them. If you called this tool because the user asked a question, answer the question.",
  };
};
