import React from "react";
import { type getEventTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { VStack } from "@/components/ui/stack";
import { EventCard } from "../../components/event-card";
import { ToolCallComponent } from "../../components/tool-call";

export const googleCalendarGetEventToolConfigClient: ClientToolConfig<
  typeof getEventTool.inputSchema.shape,
  typeof getEventTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <ToolCallComponent
        action="Fetching Event"
        primaryText={args.eventId ?? ""}
        secondaryText={`From calendar: ${args.calendarId}`}
      />
    );
  },
  ResultComponent: ({ result }) => {
    return (
      <VStack className="items-start gap-2">
        <h3 className="text-sm font-medium">Event Details</h3>
        <EventCard event={result.event} showDetails={true} />
      </VStack>
    );
  },
};
