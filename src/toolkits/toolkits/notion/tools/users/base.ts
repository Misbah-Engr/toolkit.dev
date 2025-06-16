import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

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
    results: z.array(
      z.object({
        id: z.string(),
        type: z.enum(["person", "bot"]),
        name: z.string().nullish(),
        avatar_url: z.string().nullish(),
        person: z
          .object({
            email: z.string().optional(),
          })
          .optional(),
        bot: z
          .object({
            owner: z.record(z.unknown()).nullish(),
            workspace_name: z.string().nullish(),
          })
          .optional(),
      }),
    ),
    has_more: z.boolean(),
    next_cursor: z.string().optional(),
  }),
});
