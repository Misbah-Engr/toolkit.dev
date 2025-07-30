import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";
import type { calendar_v3 } from "googleapis";

export const searchEventsTool = createBaseTool({
  description: "Search for events across calendars using free text search",
  inputSchema: z.object({
    query: z.string().describe("Free text search terms to find events"),
    calendarId: z
      .string()
      .describe(
        "The ID of the calendar to search in (use 'primary' for primary calendar)",
      ),
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
    timeZone: z.string().optional().describe("Time zone of the calendar"),
  }),
});
