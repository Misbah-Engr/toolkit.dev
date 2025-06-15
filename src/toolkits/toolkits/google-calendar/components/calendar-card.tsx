import React from "react";
import { Badge } from "@/components/ui/badge";
import { HStack, VStack } from "@/components/ui/stack";
import { Calendar, Clock, Shield } from "lucide-react";

interface CalendarCardProps {
  calendar: {
    id: string;
    summary: string;
    description?: string;
    timeZone: string;
    accessRole: string;
    primary?: boolean;
    selected?: boolean;
  };
  showDetails?: boolean;
}

export const CalendarCard: React.FC<CalendarCardProps> = ({
  calendar,
  showDetails = false,
}) => {
  return (
    <div className="hover:bg-muted/50 rounded-lg border p-4 transition-colors">
      <VStack className="items-start gap-2">
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
          <HStack className="gap-1">
            {calendar.primary && (
              <Badge variant="default" className="text-xs">
                Primary
              </Badge>
            )}
            {calendar.selected && (
              <Badge variant="secondary" className="text-xs">
                Selected
              </Badge>
            )}
          </HStack>
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
    </div>
  );
};
