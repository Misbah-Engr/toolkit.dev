import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const listUsersTool = createBaseTool({
  description: "List all users in the workspace",
  inputSchema: z.object({
    start_cursor: z.string().optional().describe("Pagination cursor to start from"),
    page_size: z.number().max(100).optional().describe("Number of results per page (max 100)"),
  }),
  outputSchema: z.object({
    results: z.array(
      z.object({
        id: z.string(),
        type: z.enum(["person", "bot"]),
        name: z.string().optional(),
        avatar_url: z.string().optional(),
        person: z.object({
          email: z.string(),
        }).optional(),
        bot: z.object({
          owner: z.record(z.unknown()),
          workspace_name: z.string().optional(),
        }).optional(),
      })
    ),
    has_more: z.boolean(),
    next_cursor: z.string().optional(),
  }),
});