import React from "react";
import { type getCalendarTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { VStack } from "@/components/ui/stack";
import { CalendarCard } from "../../components/calendar-card";
import { ToolCallComponent } from "../../components/tool-call";

export const googleCalendarGetCalendarToolConfigClient: ClientToolConfig<
  typeof getCalendarTool.inputSchema.shape,
  typeof getCalendarTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <ToolCallComponent
        action="Fetching Calendar"
        primaryText={args.calendarId ?? ""}
      />
    );
  },
  ResultComponent: ({ result }) => {
    return (
      <VStack className="items-start gap-2">
        <h3 className="text-sm font-medium">Calendar Details</h3>
        <CalendarCard calendar={result.calendar} showDetails={true} />
      </VStack>
    );
  },
};
