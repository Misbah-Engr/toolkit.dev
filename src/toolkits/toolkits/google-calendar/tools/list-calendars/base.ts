import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";
import type { calendar_v3 } from "googleapis";

export const listCalendarsTool = createBaseTool({
  description: "List all calendars for the authenticated user",
  inputSchema: z.object({
    maxResults: z
      .number()
      .describe("Maximum number of calendars to return (default: 100)"),
    pageToken: z
      .string()
      .describe("Token for pagination (use empty string for first page)"),
  }),
  outputSchema: z.object({
    calendars: z.array(z.custom<calendar_v3.Schema$CalendarListEntry>()),
    nextPageToken: z
      .string()
      .optional()
      .describe("Token for next page of results"),
  }),
});
