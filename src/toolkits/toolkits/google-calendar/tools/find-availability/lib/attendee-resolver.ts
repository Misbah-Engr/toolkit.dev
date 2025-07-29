import type { Client } from "@notionhq/client";
import type { UserObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { notionListUsersToolConfigServer } from "../../../../notion/tools/users/server";

/**
 * Resolves Notion user names to email addresses
 * @param notion - Notion client
 * @param attendeeNames - Array of user names to resolve
 * @returns Array of email addresses
 */
export const resolveAttendeeEmails = async (
  notion: Client,
  attendeeNames: string[]
): Promise<string[]> => {
  if (!attendeeNames || attendeeNames.length === 0) {
    return [];
  }

  try {
    const notionUsers = await notionListUsersToolConfigServer(notion).callback({
      start_cursor: "",
      page_size: 100,
    });

    const nameToEmail = new Map(
      notionUsers.results.map((user: UserObjectResponse) => {
        if (user.type === "person") {
          return [user.name?.toLowerCase() ?? "", user.person?.email ?? ""];
        }
        return [user.name?.toLowerCase() ?? "", ""];
      })
    );

    return attendeeNames
      .map(name => nameToEmail.get(name.toLowerCase()))
      .filter((email): email is string => !!email);
  } catch {
    // Failed to resolve attendees, return empty array
    return [];
  }
}; 