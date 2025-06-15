import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

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
    calendars: z.array(
      z.object({
        id: z.string().describe("The calendar ID"),
        summary: z.string().describe("The calendar title"),
        description: z.string().optional().describe("The calendar description"),
        timeZone: z.string().describe("The time zone of the calendar"),
        colorId: z.string().optional().describe("The color ID of the calendar"),
        backgroundColor: z
          .string()
          .optional()
          .describe("The background color of the calendar"),
        foregroundColor: z
          .string()
          .optional()
          .describe("The foreground color of the calendar"),
        selected: z
          .boolean()
          .optional()
          .describe("Whether the calendar is selected"),
        accessRole: z.string().describe("The access role for the calendar"),
        primary: z
          .boolean()
          .optional()
          .describe("Whether this is the primary calendar"),
      }),
    ),
    nextPageToken: z
      .string()
      .optional()
      .describe("Token for next page of results"),
  }),
});
