import type { Client } from "@notionhq/client";
import type { ServerToolConfig } from "@/toolkits/types";
import type { listUsersTool } from "./base";

export const notionListUsersToolConfigServer = (
  notion: Client,
): ServerToolConfig<
  typeof listUsersTool.inputSchema.shape,
  typeof listUsersTool.outputSchema.shape
> => {
  return {
    callback: async ({ start_cursor, page_size = 100 }) => {
      try {
        const response = await notion.users.list({
          start_cursor: start_cursor || undefined,
          page_size,
        });

        return {
          results: response.results,
          has_more: response.has_more,
          next_cursor: response.next_cursor ?? undefined,
        };
      } catch (error) {
        console.error("Notion API error:", error);
        throw new Error("Failed to retrieve users from Notion");
      }
    },
    message:
      "Successfully retrieved workspace users. The user is shown the responses in the UI. Do not reiterate them. If you called this tool because the user asked a question, answer the question.",
  };
};
