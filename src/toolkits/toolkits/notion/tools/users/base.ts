import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";
import type { UserObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const listUsersTool = createBaseTool({
  description: "List all users in the workspace",
  inputSchema: z.object({
    start_cursor: z
      .string()
      .describe("Pagination cursor to start from (blank for first page)"),
    page_size: z
      .number()
      .max(100)
      .describe("Number of results per page (max 100, default 10)"),
  }),
  outputSchema: z.object({
    results: z.array(z.custom<UserObjectResponse>()),
    has_more: z.boolean(),
    next_cursor: z.string().optional(),
  }),
});
