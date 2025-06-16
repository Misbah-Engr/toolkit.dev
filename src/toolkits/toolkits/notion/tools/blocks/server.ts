import type { Client } from "@notionhq/client";
import type { ServerToolConfig } from "@/toolkits/types";
import type { getBlocksTool } from "./base";

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
