import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const createEventTool = createBaseTool({
  description: "Create a new event in a Google Calendar",
  inputSchema: z.object({
    calendarId: z
      .string()
      .describe("The ID of the calendar to create the event in (use 'primary' for primary calendar)"),
    summary: z
      .string()
      .describe("The title/summary of the event"),
    description: z
      .string()
      .describe("Detailed description of the event"),
    location: z
      .string()
      .describe("Location of the event"),
    start: z.object({
      dateTime: z
        .string()
        .describe("Start time as RFC3339 timestamp (for timed events)"),
      date: z
        .string()
        .describe("Start date in YYYY-MM-DD format (for all-day events)"),
      timeZone: z
        .string()
        .describe("Time zone for the event (e.g., 'America/New_York')"),
    }),
    end: z.object({
      dateTime: z
        .string()
        .describe("End time as RFC3339 timestamp (for timed events)"),
      date: z
        .string()
        .describe("End date in YYYY-MM-DD format (for all-day events)"),
      timeZone: z
        .string()
        .describe("Time zone for the event (e.g., 'America/New_York')"),
    }),
    attendees: z
      .array(z.object({
        email: z.string().email().describe("Email address of the attendee"),
        displayName: z.string().describe("Display name of the attendee"),
        optional: z.boolean().describe("Whether attendance is optional"),
        responseStatus: z
          .enum(["needsAction", "declined", "tentative", "accepted"])
          .describe("Initial response status"),
      }))
      .describe("List of attendees to invite"),
    visibility: z
      .enum(["default", "public", "private", "confidential"])
      .describe("Visibility of the event"),
    transparency: z
      .enum(["opaque", "transparent"])
      .describe("Whether the event blocks time on the calendar ('opaque') or not ('transparent')"),
    reminders: z.object({
      useDefault: z.boolean().describe("Whether to use default reminders"),
      overrides: z
        .array(z.object({
          method: z.enum(["email", "popup"]).describe("Reminder method"),
          minutes: z.number().describe("Minutes before the event to send the reminder"),
        }))
        .describe("Custom reminder overrides"),
    })
    .describe("Event reminders configuration"),
    sendUpdates: z
      .enum(["all", "externalOnly", "none"])
      .describe("Whether to send email notifications to attendees"),
  }),
  outputSchema: z.object({
    id: z.string().describe("The created event ID"),
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
          optional: z.boolean().optional(),
        }),
      )
      .optional(),
    htmlLink: z.string().optional().describe("Link to the event in Google Calendar"),
    created: z.string().optional().describe("Event creation time"),
    updated: z.string().optional().describe("Last modification time"),
  }),
}); 