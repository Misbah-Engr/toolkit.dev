import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

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
    events: z.array(
      z.object({
        id: z.string().describe("Event ID"),
        summary: z.string().optional().describe("Event title"),
        description: z.string().optional().describe("Event description"),
        location: z.string().optional().describe("Event location"),
        start: z.object({
          dateTime: z
            .string()
            .optional()
            .describe("Start time as RFC3339 timestamp"),
          date: z
            .string()
            .optional()
            .describe("Start date (for all-day events)"),
          timeZone: z.string().optional().describe("Time zone"),
        }),
        end: z.object({
          dateTime: z
            .string()
            .optional()
            .describe("End time as RFC3339 timestamp"),
          date: z.string().optional().describe("End date (for all-day events)"),
          timeZone: z.string().optional().describe("Time zone"),
        }),
        status: z.string().optional().describe("Event status"),
        visibility: z.string().optional().describe("Event visibility"),
        organizer: z
          .object({
            email: z.string().optional(),
            displayName: z.string().optional(),
          })
          .optional(),
        attendees: z
          .array(
            z.object({
              email: z.string().optional(),
              displayName: z.string().optional(),
              responseStatus: z.string().optional(),
            }),
          )
          .optional(),
        recurringEventId: z
          .string()
          .optional()
          .describe(
            "For instances of recurring events, the ID of the recurring event",
          ),
        created: z.string().optional().describe("Event creation time"),
        updated: z.string().optional().describe("Last modification time"),
      }),
    ),
    nextPageToken: z
      .string()
      .optional()
      .describe("Token for next page of results"),
    timeZone: z.string().optional().describe("Time zone of the calendar"),
  }),
});
