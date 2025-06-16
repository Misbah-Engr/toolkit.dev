import React from "react";
import { type searchEventsTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { HStack, VStack } from "@/components/ui/stack";
import { EventCard } from "../../components/event-card";
import { ToolCallComponent } from "../../components/tool-call";

export const googleCalendarSearchEventsToolConfigClient: ClientToolConfig<
  typeof searchEventsTool.inputSchema.shape,
  typeof searchEventsTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <ToolCallComponent
        action="Searching Events"
        primaryText={`"${args.query}" (${args.maxResults ?? 5} events)`}
        secondaryText={`In calendar: ${args.calendarId}`}
      />
    );
  },
  ResultComponent: ({ result }) => {
    const { events, timeZone } = result;

    if (events.length === 0) {
      return (
        <p className="text-muted-foreground text-sm">
          No events found matching your search
        </p>
      );
    }

    return (
      <VStack className="items-start gap-2">
        <HStack className="items-center justify-between">
          <h3 className="text-sm font-medium">
            Search Results ({events.length})
          </h3>
          {timeZone && (
            <span className="text-muted-foreground text-xs">{timeZone}</span>
          )}
        </HStack>

        <div className="flex w-full flex-col gap-2">
          {events.map((event) => (
            <EventCard key={event.id} event={event} showDetails={true} />
          ))}
        </div>
      </VStack>
    );
  },
};
