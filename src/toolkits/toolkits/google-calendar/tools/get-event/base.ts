import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";
import type { calendar_v3 } from "googleapis";

export const getEventTool = createBaseTool({
  description: "Get details of a specific event by ID",
  inputSchema: z.object({
    calendarId: z
      .string()
      .describe("The ID of the calendar containing the event"),
    eventId: z.string().describe("The ID of the event to retrieve"),
  }),
  outputSchema: z.object({
    event: z.custom<calendar_v3.Schema$Event>(),
  }),
});
