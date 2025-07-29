import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const findAvailabilityTool = createBaseTool({
  description: "Find available time slots in a calendar by analyzing existing events. Uses intelligent defaults: 60-minute meetings, 7-day search window, user's calendar only if no attendees specified.",
  inputSchema: z.object({
    startDate: z.string().optional().describe("Start date to search (YYYY-MM-DD format). Defaults to today if not provided."),
    endDate: z.string().optional().describe("End date to search (YYYY-MM-DD format). Defaults to startDate + 7 days if not provided."),
    startTime: z.string().optional().describe("Start time for daily search (HH:MM format, 24-hour). Defaults to 09:00 if not provided."),
    endTime: z.string().optional().describe("End time for daily search (HH:MM format, 24-hour). Defaults to 17:00 if not provided."),
    durationMinutes: z.number().optional().describe("Meeting duration in minutes. Defaults to 60 minutes if not provided."),
    attendeeNames: z.array(z.string()).optional().describe("List of Notion workspace user names to check availability for. Optional - if not provided, only checks user's calendar."),
    maxResults: z.number().optional().describe("Maximum number of slots to return. Defaults to 10."),
  }),
  outputSchema: z.object({
    availableSlots: z.array(
      z.object({
        start: z.string().describe("Start time of available slot (RFC3339 timestamp)"),
        end: z.string().describe("End time of available slot (RFC3339 timestamp)"),
        duration: z.number().describe("Duration of the slot in minutes"),
        dayOfWeek: z.string().describe("Day of the week"),
        date: z.string().describe("Date in YYYY-MM-DD format"),
        timeRange: z.string().describe("Human-readable time range"),
      })
    ),
    totalSlotsFound: z.number().describe("Total number of available slots found"),
    searchPeriod: z.object({
      start: z.string().describe("Start of search period"),
      end: z.string().describe("End of search period"),
      duration: z.number().describe("Requested duration in minutes"),
    }),
    conflictingEvents: z.array(
      z.object({
        id: z.string(),
        summary: z.string().optional(),
        start: z.string(),
        end: z.string(),
      })
    ).describe("Events that are blocking availability during the search period"),
  }),
}); 