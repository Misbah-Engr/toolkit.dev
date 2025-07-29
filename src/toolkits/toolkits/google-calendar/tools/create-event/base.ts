import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";
import type { calendar_v3 } from "googleapis";

export const createEventTool = createBaseTool({
  description: "Create a new event in a Google Calendar",
  inputSchema: z.object({
    title: z.string().describe("Event title"),
    startDateTime: z.string().describe("Start time (RFC3339 timestamp)"),
    endDateTime: z.string().describe("End time (RFC3339 timestamp)"),
  }).required(),
  outputSchema: z.object({
    event: z.custom<calendar_v3.Schema$Event>(),
  }),
}); 