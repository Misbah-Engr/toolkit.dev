import React from "react";
import { type listEventsTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { HStack, VStack } from "@/components/ui/stack";
import { EventCard } from "../../components/event-card";
import { ToolCallComponent } from "../../components/tool-call";

export const googleCalendarListEventsToolConfigClient: ClientToolConfig<
  typeof listEventsTool.inputSchema.shape,
  typeof listEventsTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    const timeRangeText =
      args.timeMin && args.timeMax
        ? [
            args.timeMin &&
              `From: ${new Date(args.timeMin).toLocaleDateString()}`,
            args.timeMax &&
              `To: ${new Date(args.timeMax).toLocaleDateString()}`,
          ]
            .filter(Boolean)
            .join(" • ")
        : undefined;

    return (
      <ToolCallComponent
        action="Listing Events"
        primaryText={`From calendar: ${args.calendarId} (${args.maxResults ?? 5} events)`}
        secondaryText={timeRangeText}
      />
    );
  },
  ResultComponent: ({ result }) => {
    const { events, nextPageToken, timeZone } = result;

    if (events.length === 0) {
      return <p className="text-muted-foreground text-sm">No events found</p>;
    }

    return (
      <VStack className="items-start gap-2">
        <HStack className="text-muted-foreground items-center justify-between">
          <h3 className="text-sm font-medium">Events ({events.length})</h3>
          <HStack className="gap-2">
            {timeZone && (
              <span className="text-muted-foreground text-xs">{timeZone}</span>
            )}
            {nextPageToken && (
              <span className="text-muted-foreground text-xs">
                More results available
              </span>
            )}
          </HStack>
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
