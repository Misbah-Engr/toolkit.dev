import type { Client } from "@notionhq/client";
import type { ServerToolConfig } from "@/toolkits/types";
import type { getPageTool, searchPagesTool, createPageTool } from "./base";

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

export const notionCreatePageToolConfigServer = (
  notion: Client,
): ServerToolConfig<
  typeof createPageTool.inputSchema.shape,
  typeof createPageTool.outputSchema.shape
> => {
  return {
    callback: async ({ parent_page_id, parent_database_id, title, content, properties = {} }) => {
      try {
        // Determine parent type and create appropriate parent object
        let parent: any;
        if (parent_database_id) {
          parent = { database_id: parent_database_id };
        } else if (parent_page_id) {
          parent = { page_id: parent_page_id };
        } else {
          throw new Error("Either parent_page_id or parent_database_id must be provided");
        }

        // Create page properties based on whether it's a database page or regular page
        const pageProperties: any = {};
        if (parent_database_id) {
          // For database pages, use the provided properties
          Object.assign(pageProperties, properties);
          // Ensure title property exists for database pages
          if (!pageProperties.Name && !pageProperties.Title && !pageProperties.title) {
            pageProperties.Name = {
              title: [{ text: { content: title } }]
            };
          }
        } else {
          // For regular pages, set the title
          pageProperties.title = {
            title: [{ text: { content: title } }]
          };
        }

        // Create the page
        const response = await notion.pages.create({
          parent,
          properties: pageProperties,
        });

        // If content is provided, add it as blocks
        if (content && "id" in response) {
          const blocks = content.split('\n').filter(line => line.trim()).map(line => ({
            object: "block" as const,
            type: "paragraph" as const,
            paragraph: {
              rich_text: [{ type: "text" as const, text: { content: line } }]
            }
          }));

          if (blocks.length > 0) {
            await notion.blocks.children.append({
              block_id: response.id,
              children: blocks,
            });
          }
        }

        if (
          response.object !== "page" ||
          !("created_time" in response) ||
          !("last_edited_time" in response) ||
          !("url" in response) ||
          !("archived" in response)
        ) {
          throw new Error("Invalid page response");
        }

        return {
          page: response,
        };
      } catch (error) {
        console.error("Notion API error:", error);
        throw new Error("Failed to create page in Notion");
      }
    },
    message:
      "Successfully created a new page in Notion. The user is shown the page details in the UI. Do not reiterate them.",
  };
};
