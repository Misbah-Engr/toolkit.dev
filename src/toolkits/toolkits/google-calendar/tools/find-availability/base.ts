import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const findAvailabilityTool = createBaseTool({
  description: "Find available time slots in a calendar by analyzing existing events",
  inputSchema: z.object({
    calendarId: z
      .string()
      .describe("The ID of the calendar to check availability for (use 'primary' for primary calendar)"),
    timeMin: z
      .string()
      .describe("Start of time range to check (RFC3339 timestamp)"),
    timeMax: z
      .string()
      .describe("End of time range to check (RFC3339 timestamp)"),
    duration: z
      .number()
      .describe("Duration of the meeting in minutes"),
    workingHours: z.object({
      startTime: z
        .string()
        .describe("Start of working hours in HH:MM format (default: '09:00')"),
      endTime: z
        .string()
        .describe("End of working hours in HH:MM format (default: '17:00')"),
      workingDays: z
        .array(z.number().min(0).max(6))
        .describe("Working days as numbers (0=Sunday, 1=Monday, etc.) (default: [1,2,3,4,5])"),
    })
    .describe("Working hours configuration"),
    minGapBetweenEvents: z
      .number()
      .describe("Minimum gap between events in minutes (default: 15)"),
    maxResults: z
      .number()
      .describe("Maximum number of available slots to return (default: 10)"),
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