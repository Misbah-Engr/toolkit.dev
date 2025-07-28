import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";
import type { calendar_v3 } from "googleapis";

export const listEventsTool = createBaseTool({
  description: "List events from a specific calendar",
  inputSchema: z.object({
    calendarId: z
      .string()
      .describe("The ID of the calendar to list events from"),
    timeMin: z
      .string()
      .describe(
        "Lower bound (inclusive) for an event's end time to filter by (RFC3339 timestamp, use empty string to skip)",
      ),
    timeMax: z
      .string()
      .describe(
        "Upper bound (exclusive) for an event's start time to filter by (RFC3339 timestamp, use empty string to skip)",
      ),
    maxResults: z
      .number()
      .describe("Maximum number of events to return (1-2500, default: 5)"),
    pageToken: z
      .string()
      .describe("Token for pagination (use empty string for first page)"),
    orderBy: z
      .string()
      .describe(
        "Order of the events returned ('startTime' or 'updated', use empty string for default)",
      ),
    singleEvents: z
      .boolean()
      .describe(
        "Whether to expand recurring events into instances (default: true)",
      ),
  }),
  outputSchema: z.object({
    events: z.array(z.custom<calendar_v3.Schema$Event>()),
    nextPageToken: z
      .string()
      .optional()
      .describe("Token for next page of results"),
    timeZone: z.string().optional().describe("Time zone of the calendar"),
  }),
});
