import React from "react";
import { type findAvailabilityTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { HStack, VStack } from "@/components/ui/stack";
import { ToolCallComponent } from "../../components/tool-call";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const googleCalendarFindAvailabilityToolConfigClient: ClientToolConfig<
  typeof findAvailabilityTool.inputSchema.shape,
  typeof findAvailabilityTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    const startDate = new Date(`${args.startDate}T00:00:00`).toLocaleDateString();
    const endDate = new Date(`${args.endDate}T00:00:00`).toLocaleDateString();
    const dateRange = startDate === endDate ? startDate : `${startDate} - ${endDate}`;

    return (
      <ToolCallComponent
        action="Finding Availability"
        primaryText={`${args.durationMinutes} minute slots`}
        secondaryText={`${dateRange} • Primary Calendar`}
      />
    );
  },
  ResultComponent: ({ result }) => {
    const { availableSlots, totalSlotsFound, searchPeriod, conflictingEvents } = result;

    if (availableSlots.length === 0) {
      return (
        <VStack className="items-start gap-3">
          <HStack className="items-center gap-2">
            <AlertCircle className="size-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-700">No Available Slots Found</span>
          </HStack>
          
          <p className="text-muted-foreground text-sm">
            No {searchPeriod.duration}-minute slots available in the specified time range.
          </p>

          {conflictingEvents.length > 0 && (
            <VStack className="w-full items-start gap-2">
              <h4 className="text-sm font-medium">Conflicting Events ({conflictingEvents.length})</h4>
              <div className="flex w-full flex-col gap-1">
                {conflictingEvents.slice(0, 3).map((event, index) => (
                  <div key={index} className="text-muted-foreground text-xs p-2 border rounded">
                    <div className="font-medium">{event.summary ?? "Untitled Event"}</div>
                    <div className="text-xs">
                      {new Date(event.start).toLocaleString()} - {new Date(event.end).toLocaleString()}
                    </div>
                  </div>
                ))}
                {conflictingEvents.length > 3 && (
                  <p className="text-muted-foreground text-xs">
                    ...and {conflictingEvents.length - 3} more events
                  </p>
                )}
              </div>
            </VStack>
          )}
        </VStack>
      );
    }

    return (
      <VStack className="items-start gap-3">
        <HStack className="items-center justify-between w-full">
          <HStack className="items-center gap-2">
            <CheckCircle className="size-4 text-green-500" />
            <span className="text-sm font-medium text-green-500">
              {totalSlotsFound} Available Slot{totalSlotsFound !== 1 ? 's' : ''} Found
            </span>
          </HStack>

          <HStack className="flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              <Clock className="size-3 mr-1" />
              {searchPeriod.duration} minutes each
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Calendar className="size-3 mr-1" />
              {new Date(searchPeriod.start).toLocaleDateString()} - {new Date(searchPeriod.end).toLocaleDateString()}
            </Badge>
          </HStack>
        </HStack>

        <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {availableSlots.map((slot, index) => (
            <Card key={index} className="border-l-4 border-l-primary hover:border-l-primary/80 transition-colors">
              <CardContent className="p-3">
                <VStack className="items-start gap-1">
                  <HStack className="items-center justify-between w-full">
                    <span className="text-sm font-medium">{slot.dayOfWeek}</span>
                    <Badge variant="secondary" className="text-xs">
                      {slot.duration}min
                    </Badge>
                  </HStack>
                  <p className="text-muted-foreground text-xs">{slot.date}</p>
                  <p className="text-sm font-medium">{slot.timeRange}</p>
                </VStack>
              </CardContent>
            </Card>
          ))}
        </div>

        {conflictingEvents.length > 0 && (
          <VStack className="w-full items-start gap-2 mt-2">
            <HStack className="items-center gap-2">
              <AlertCircle className="size-4 text-amber-600" />
              <h4 className="text-sm font-medium text-amber-700">
                Conflicting Events ({conflictingEvents.length})
              </h4>
            </HStack>
            <div className="grid w-full gap-2 sm:grid-cols-2">
              {conflictingEvents.slice(0, 2).map((event, index) => (
                <div key={index} className="text-muted-foreground text-xs p-2 border rounded-md bg-muted/50">
                  <div className="font-medium">{event.summary ?? "Untitled Event"}</div>
                  <div className="text-xs mt-1">
                    {new Date(event.start).toLocaleString()} - {new Date(event.end).toLocaleString()}
                  </div>
                </div>
              ))}
              {conflictingEvents.length > 2 && (
                <p className="text-muted-foreground text-xs col-span-2">
                  ...and {conflictingEvents.length - 2} more events
                </p>
              )}
            </div>
          </VStack>
        )}
      </VStack>
    );
  },
}; 