import type { Client, UserObjectResponse } from "@notionhq/client";
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
          start_cursor,
          page_size,
        });

        const results = response.results.map((user: UserObjectResponse) => ({
          id: user.id,
          type: user.type,
          name: user.name,
          avatar_url: user.avatar_url,
          person: user.type === "person" ? user.person : undefined,
          bot:
            user.type === "bot"
              ? Object.keys(user.bot).length > 0
                ? user.bot
                : undefined
              : undefined,
        }));

        return {
          results,
          has_more: response.has_more,
          next_cursor: response.next_cursor ?? undefined,
        };
      } catch (error) {
        console.error("Notion API error:", error);
        throw new Error("Failed to retrieve users from Notion");
      }
    },
    message: "Successfully retrieved workspace users.",
  };
};
