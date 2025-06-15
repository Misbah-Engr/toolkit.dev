import React from "react";
import { type listCalendarsTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { HStack, VStack } from "@/components/ui/stack";
import { Calendar } from "lucide-react";
import { CalendarCard } from "../../components/calendar-card";
import { ToolCallComponent } from "../../components/tool-call";

export const googleCalendarListCalendarsToolConfigClient: ClientToolConfig<
  typeof listCalendarsTool.inputSchema.shape,
  typeof listCalendarsTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <ToolCallComponent
        action="Listing Calendars"
        primaryText={`Fetching up to ${args.maxResults} calendars`}
      />
    );
  },
  ResultComponent: ({ result }) => {
    const { calendars, nextPageToken } = result;

    if (calendars.length === 0) {
      return (
        <div className="flex items-center justify-center py-8">
          <VStack className="items-center gap-2">
            <Calendar className="text-muted-foreground size-8" />
            <p className="text-muted-foreground text-sm">No calendars found</p>
          </VStack>
        </div>
      );
    }

    return (
      <VStack className="items-start gap-4">
        <HStack className="items-center justify-between">
          <h3 className="text-sm font-medium">
            Calendars ({calendars.length})
          </h3>
          {nextPageToken && (
            <span className="text-muted-foreground text-xs">
              More results available
            </span>
          )}
        </HStack>

        <div className="grid gap-3">
          {calendars.map((calendar) => (
            <CalendarCard
              key={calendar.id}
              calendar={calendar}
              showDetails={true}
            />
          ))}
        </div>
      </VStack>
    );
  },
};
