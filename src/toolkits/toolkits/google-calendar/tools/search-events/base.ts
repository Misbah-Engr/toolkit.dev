import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const searchEventsTool = createBaseTool({
  description: "Search for events across calendars using free text search",
  inputSchema: z.object({
    query: z.string().describe("Free text search terms to find events"),
    calendarId: z.string().optional().describe("The ID of the calendar to search in (defaults to primary calendar)"),
    timeMin: z.string().optional().describe("Lower bound (inclusive) for an event's end time to filter by (RFC3339 timestamp)"),
    timeMax: z.string().optional().describe("Upper bound (exclusive) for an event's start time to filter by (RFC3339 timestamp)"),
    maxResults: z.number().optional().describe("Maximum number of events to return (1-2500)"),
    orderBy: z.enum(["startTime", "updated"]).optional().describe("Order of the events returned"),
    singleEvents: z.boolean().optional().describe("Whether to expand recurring events into instances"),
  }),
  outputSchema: z.object({
    events: z.array(
      z.object({
        id: z.string().describe("Event ID"),
        summary: z.string().optional().describe("Event title"),
        description: z.string().optional().describe("Event description"),
        location: z.string().optional().describe("Event location"),
        start: z.object({
          dateTime: z.string().optional().describe("Start time as RFC3339 timestamp"),
          date: z.string().optional().describe("Start date (for all-day events)"),
          timeZone: z.string().optional().describe("Time zone"),
        }),
        end: z.object({
          dateTime: z.string().optional().describe("End time as RFC3339 timestamp"),
          date: z.string().optional().describe("End date (for all-day events)"),
          timeZone: z.string().optional().describe("Time zone"),
        }),
        status: z.string().optional().describe("Event status"),
        organizer: z.object({
          email: z.string().optional(),
          displayName: z.string().optional(),
        }).optional(),
        attendees: z.array(
          z.object({
            email: z.string().optional(),
            displayName: z.string().optional(),
            responseStatus: z.string().optional(),
          })
        ).optional(),
        created: z.string().optional().describe("Event creation time"),
        updated: z.string().optional().describe("Last modification time"),
      })
    ),
    timeZone: z.string().optional().describe("Time zone of the calendar"),
  }),
});