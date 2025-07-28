import React from "react";
import { Badge } from "@/components/ui/badge";
import { HStack, VStack } from "@/components/ui/stack";
import { Clock, Users, User } from "lucide-react";

interface EventCardProps {
  event: {
    id: string;
    summary?: string;
    description?: string;
    start: {
      dateTime: string;
    };
    end: {
      dateTime: string;
    };
    status?: string;
    organizer?: {
      email?: string;
      displayName?: string;
    };
    attendees?: {
      email?: string;
      displayName?: string;
    }[];
    htmlLink?: string;
  };
  showDetails?: boolean;
}

const formatDateTime = (dateTime: string): string => {
  return new Date(dateTime).toLocaleString();
};

const formatTime = (dateTime: string): string => {
  return new Date(dateTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDate = (dateTime: string): string => {
  return new Date(dateTime).toLocaleDateString('en-US', { 
    weekday: 'short',
    month: 'short', 
    day: 'numeric' 
  });
};

export const EventCard: React.FC<EventCardProps> = ({
  event,
  showDetails = false,
}) => {
  const startDate = formatDateTime(event.start.dateTime);
  const endDate = formatDateTime(event.end.dateTime);
  const startTime = formatTime(event.start.dateTime);
  const endTime = formatTime(event.end.dateTime);
  const formattedDate = formatDate(event.start.dateTime);

  return (
    <div className="w-full rounded-lg border bg-card p-4">
      {/* Header Section */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-primary mb-1">
              {event.summary ?? "Untitled Event"}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4" />
              <span>
                {startDate.split(" ")[0] === endDate.split(" ")[0]
                  ? `${formattedDate} • ${startTime} - ${endTime}`
                  : `${startDate} ${startTime} - ${endDate} ${endTime}`}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {event.status && event.status !== "confirmed" && (
              <Badge variant="outline" className="text-xs">
                {event.status}
              </Badge>
            )}
          </div>
        </div>

        {event.description && showDetails && (
          <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
            {event.description}
          </p>
        )}
      </div>

      {/* Details Section - Single Column Layout */}
      {showDetails && (
        <div className="pt-3 border-t">
          <VStack className="items-start gap-2">
            {event.organizer && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="size-4" />
                <span>
                  Organized by{" "}
                  <span className="font-medium">
                    {event.organizer.displayName ?? event.organizer.email}
                  </span>
                </span>
              </div>
            )}

            {event.attendees && event.attendees.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="size-4" />
                <span>
                  {event.attendees.length} attendee
                  {event.attendees.length !== 1 ? "s" : ""} invited
                </span>
              </div>
            )}
          </VStack>
        </div>
      )}
    </div>
  );
};
