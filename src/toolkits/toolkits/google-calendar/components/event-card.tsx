import React from "react";
import { Badge } from "@/components/ui/badge";
import { HStack, VStack } from "@/components/ui/stack";
import { Clock, MapPin, Users, ExternalLink, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EventCardProps {
  event: {
    id: string;
    summary?: string;
    description?: string;
    location?: string;
    start: {
      dateTime?: string;
      date?: string;
      timeZone?: string;
    };
    end: {
      dateTime?: string;
      date?: string;
      timeZone?: string;
    };
    status?: string;
    visibility?: string;
    organizer?: {
      email?: string;
      displayName?: string;
    };
    attendees?: {
      email?: string;
      displayName?: string;
      responseStatus?: string;
    }[];
    htmlLink?: string;
  };
  showDetails?: boolean;
}

const formatDateTime = (dateTime?: string, date?: string): string => {
  if (dateTime) {
    return new Date(dateTime).toLocaleString();
  }
  if (date) {
    return new Date(date).toLocaleDateString();
  }
  return "No date";
};

const formatTime = (dateTime?: string): string => {
  if (!dateTime) return "";
  return new Date(dateTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const EventCard: React.FC<EventCardProps> = ({
  event,
  showDetails = false,
}) => {
  const isAllDay = !event.start.dateTime && !event.end.dateTime;
  const startDate = formatDateTime(event.start.dateTime, event.start.date);
  const endDate = formatDateTime(event.end.dateTime, event.end.date);
  const startTime = formatTime(event.start.dateTime);
  const endTime = formatTime(event.end.dateTime);

  return (
    <VStack className="items-start border-b pb-2 last:border-b-0 last:pb-0">
      <HStack className="w-full items-start gap-2">
        <VStack className="flex-1 items-start gap-1">
          <HStack>
            <h3 className="text-primary font-medium">
              {event.summary ?? "Untitled Event"}
            </h3>
            <HStack className="flex-wrap items-center gap-x-1 text-xs">
              <Clock className="size-3" />
              <span>
                {isAllDay
                  ? `${startDate}${startDate.split(" ")[0] !== endDate.split(" ")[0] ? ` - ${endDate}` : ""}`
                  : startDate.split(" ")[0] === endDate.split(" ")[0]
                    ? `${startDate.split(" ")[0]} ${startTime} - ${endTime}`
                    : `${startDate} ${startTime} - ${endDate} ${endTime}`}
              </span>
            </HStack>
            {isAllDay && (
              <Badge variant="secondary" className="text-xs">
                All Day
              </Badge>
            )}
            {event.status && event.status !== "confirmed" && (
              <Badge variant="outline" className="text-xs">
                {event.status}
              </Badge>
            )}
          </HStack>
          <HStack>
            {event.location && (
              <HStack className="items-center gap-1">
                <MapPin className="size-3" />
                <span className="max-w-32 truncate">{event.location}</span>
              </HStack>
            )}
          </HStack>

          {event.description && showDetails && (
            <p className="text-muted-foreground line-clamp-3 text-xs">
              {event.description}
            </p>
          )}
        </VStack>
      </HStack>

      {showDetails && (
        <HStack className="w-full flex-wrap gap-2">
          {event.organizer && (
            <HStack className="text-muted-foreground items-center gap-2 text-xs">
              <User className="size-3" />
              <span>
                Organized by{" "}
                {event.organizer.displayName ?? event.organizer.email}
              </span>
            </HStack>
          )}

          {event.attendees && event.attendees.length > 0 && (
            <HStack className="text-muted-foreground gap-1 text-xs">
              <Users className="size-3" />
              <span>
                {event.attendees.length} attendee
                {event.attendees.length !== 1 ? "s" : ""}
              </span>
            </HStack>
          )}

          {event.htmlLink && (
            <Link href={event.htmlLink} target="_blank">
              <Button variant="outline" size="sm" className="text-xs">
                <ExternalLink className="size-3" />
                Open in Google Calendar
              </Button>
            </Link>
          )}
        </HStack>
      )}
    </VStack>
  );
};
