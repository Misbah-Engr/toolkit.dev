import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";
import type { calendar_v3 } from "googleapis";

export const getCalendarTool = createBaseTool({
  description: "Get details of a specific calendar by ID",
  inputSchema: z.object({
    calendarId: z.string().describe("The ID of the calendar to retrieve"),
  }),
  outputSchema: z.object({
    calendar: z.custom<calendar_v3.Schema$Calendar>(),
  }),
});
