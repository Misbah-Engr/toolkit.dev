import type { BlockObjectRequest, Client } from "@notionhq/client";
import type { ServerToolConfig } from "@/toolkits/types";
import type { getBlocksTool, appendBlocksTool } from "./base";

export const notionGetBlocksToolConfigServer = (
  notion: Client,
): ServerToolConfig<
  typeof getBlocksTool.inputSchema.shape,
  typeof getBlocksTool.outputSchema.shape
> => {
  return {
    callback: async ({ block_id, start_cursor, page_size = 100 }) => {
      try {
        const response = await notion.blocks.children.list({
          block_id,
          start_cursor: start_cursor || undefined,
          page_size,
        });

        const results = response.results.filter((block) => "type" in block);

        return {
          results,
          has_more: response.has_more,
          next_cursor: response.next_cursor ?? undefined,
        };
      } catch (error) {
        console.error("Notion API error:", error);
        throw new Error("Failed to retrieve blocks from Notion");
      }
    },
    message:
      "Successfully retrieved block contents. The user is shown the responses in the UI. Do not reiterate them. If you called this tool because the user asked a question, answer the question.",
  };
};

export const notionAppendBlocksToolConfigServer = (
  notion: Client,
): ServerToolConfig<
  typeof appendBlocksTool.inputSchema.shape,
  typeof appendBlocksTool.outputSchema.shape
> => {
  return {
    callback: async ({ block_id, content, block_type = "paragraph" }) => {
      try {
        // Convert content to blocks based on block_type
        const lines = content.split("\n").filter((line) => line.trim());
        const blocks = lines.map((line) => {
          const richText = [{ type: "text" as const, text: { content: line } }];

          switch (block_type) {
            case "heading_1":
              return {
                object: "block" as const,
                type: "heading_1" as const,
                heading_1: { rich_text: richText },
              };
            case "heading_2":
              return {
                object: "block" as const,
                type: "heading_2" as const,
                heading_2: { rich_text: richText },
              };
            case "heading_3":
              return {
                object: "block" as const,
                type: "heading_3" as const,
                heading_3: { rich_text: richText },
              };
            case "bulleted_list_item":
              return {
                object: "block" as const,
                type: "bulleted_list_item" as const,
                bulleted_list_item: { rich_text: richText },
              };
            case "numbered_list_item":
              return {
                object: "block" as const,
                type: "numbered_list_item" as const,
                numbered_list_item: { rich_text: richText },
              };
            case "to_do":
              return {
                object: "block" as const,
                type: "to_do" as const,
                to_do: { rich_text: richText, checked: false },
              };
            case "code":
              return {
                object: "block" as const,
                type: "code" as const,
                code: {
                  rich_text: richText,
                  language: "plain text",
                },
              };
            default: // paragraph
              return {
                object: "block" as const,
                type: "paragraph" as const,
                paragraph: { rich_text: richText },
              };
          }
        });

        const response = await notion.blocks.children.append({
          block_id,
          children: blocks as BlockObjectRequest[],
        });

        const results = response.results.filter((block) => "type" in block);

        return {
          results,
        };
      } catch (error) {
        console.error("Notion API error:", error);
        throw new Error("Failed to append blocks to Notion");
      }
    },
    message:
      "Successfully appended blocks to the page. The user is shown the new blocks in the UI. Do not reiterate them.",
  };
};
