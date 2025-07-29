import React from "react";
import { Badge } from "@/components/ui/badge";
import { HStack, VStack } from "@/components/ui/stack";
import { Calendar, Clock, Shield } from "lucide-react";
import type { calendar_v3 } from "googleapis";

interface CalendarCardProps {
  calendar: calendar_v3.Schema$CalendarListEntry;
  showDetails?: boolean;
}

export const CalendarCard: React.FC<CalendarCardProps> = ({
  calendar,
  showDetails = false,
}) => {
  return (
    <VStack className="w-full items-start gap-1 border-b pb-2 last:border-b-0 last:pb-0">
      <HStack className="w-full items-center gap-2">
        <Calendar className="text-primary size-4" />
        <VStack className="flex-1 items-start gap-0">
          <h3 className="text-sm font-medium">{calendar.summary}</h3>
          {calendar.description && (
            <p className="text-muted-foreground line-clamp-2 text-xs">
              {calendar.description}
            </p>
          )}
        </VStack>
        {calendar.primary && (
          <Badge variant="default" className="text-xs">
            Primary
          </Badge>
        )}
      </HStack>

      {showDetails && (
        <HStack className="text-muted-foreground items-center gap-4 text-xs">
          <HStack className="items-center gap-1">
            <Clock className="size-3" />
            <span>{calendar.timeZone}</span>
          </HStack>
          <HStack className="items-center gap-1">
            <Shield className="size-3" />
            <span>{calendar.accessRole}</span>
          </HStack>
        </HStack>
      )}
    </VStack>
  );
};
