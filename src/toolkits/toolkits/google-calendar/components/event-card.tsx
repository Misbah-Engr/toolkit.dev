import React from "react";
import { Badge } from "@/components/ui/badge";
import { HStack, VStack } from "@/components/ui/stack";
import { Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react";
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
    <div className="hover:bg-muted/50 rounded-lg border p-4 transition-colors">
      <VStack className="items-start gap-3">
        <HStack className="w-full items-start gap-2">
          <Calendar className="text-primary mt-0.5 size-4" />
          <VStack className="flex-1 items-start gap-1">
            <h3 className="text-sm font-medium">
              {event.summary ?? "Untitled Event"}
            </h3>

            {event.description && showDetails && (
              <p className="text-muted-foreground line-clamp-3 text-xs">
                {event.description}
              </p>
            )}

            <HStack className="text-muted-foreground items-center gap-4 text-xs">
              <HStack className="items-center gap-1">
                <Clock className="size-3" />
                <span>
                  {isAllDay
                    ? `${startDate}${startDate !== endDate ? ` - ${endDate}` : ""}`
                    : `${startTime} - ${endTime}`}
                </span>
              </HStack>

              {event.location && (
                <HStack className="items-center gap-1">
                  <MapPin className="size-3" />
                  <span className="max-w-32 truncate">{event.location}</span>
                </HStack>
              )}
            </HStack>
          </VStack>

          <HStack className="gap-1">
            {event.status && event.status !== "confirmed" && (
              <Badge variant="outline" className="text-xs">
                {event.status}
              </Badge>
            )}
            {isAllDay && (
              <Badge variant="secondary" className="text-xs">
                All Day
              </Badge>
            )}
          </HStack>
        </HStack>

        {showDetails && (
          <VStack className="w-full items-start gap-2">
            {event.organizer && (
              <HStack className="text-muted-foreground items-center gap-2 text-xs">
                <Users className="size-3" />
                <span>
                  Organized by{" "}
                  {event.organizer.displayName ?? event.organizer.email}
                </span>
              </HStack>
            )}

            {event.attendees && event.attendees.length > 0 && (
              <div className="text-muted-foreground text-xs">
                <span>
                  {event.attendees.length} attendee
                  {event.attendees.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}

            {event.htmlLink && (
              <Link href={event.htmlLink} target="_blank">
                <Button variant="outline" size="sm" className="text-xs">
                  <ExternalLink className="size-3" />
                  Open in Google Calendar
                </Button>
              </Link>
            )}
          </VStack>
        )}
      </VStack>
    </div>
  );
};
