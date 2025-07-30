import React from "react";
import { type createEventTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { EventCard } from "../../components/event-card";
import { ToolCallComponent } from "../../components/tool-call";
import { CheckCircle, Users, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const googleCalendarCreateEventToolConfigClient: ClientToolConfig<
  typeof createEventTool.inputSchema.shape,
  typeof createEventTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <ToolCallComponent
        action="Creating Event"
        primaryText={args.title ?? "New Event"}
        secondaryText={
          args.startDateTime
            ? new Date(args.startDateTime).toLocaleString()
            : "No time specified"
        }
      />
    );
  },
  ResultComponent: ({ result }) => {
    const event = result.event;

    return (
      <div className="w-full space-y-4">
        {/* Success Header */}
        <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle className="size-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-green-800 dark:text-green-200">
                Event Created Successfully
              </h3>
              <p className="text-xs text-green-600 dark:text-green-400">
                Your event has been added to Google Calendar
              </p>
            </div>
          </div>

          {event.htmlLink && (
            <Link href={event.htmlLink} target="_blank">
              <Button variant="outline" size="sm" className="text-xs">
                <ExternalLink className="mr-1 size-3" />
                View in Calendar
              </Button>
            </Link>
          )}
        </div>

        {/* Event Details Card */}
        <EventCard event={event} showDetails={true} />

        {/* Event Metadata */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-muted/50 flex items-center gap-2 rounded-lg border p-3">
            <Calendar className="text-muted-foreground size-4" />
            <div className="min-w-0">
              <p className="text-muted-foreground text-xs">Event ID</p>
              <p className="truncate font-mono text-sm">{event.id}</p>
            </div>
          </div>

          {event.attendees && event.attendees.length > 0 && (
            <div className="bg-muted/50 flex items-center gap-2 rounded-lg border p-3">
              <Users className="text-muted-foreground size-4" />
              <div>
                <p className="text-muted-foreground text-xs">Attendees</p>
                <p className="text-sm font-medium">
                  {event.attendees.length} invite
                  {event.attendees.length !== 1 ? "d" : "d"}
                </p>
              </div>
            </div>
          )}

          {event.status && (
            <div className="bg-muted/50 flex items-center gap-2 rounded-lg border p-3">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <div>
                <p className="text-muted-foreground text-xs">Status</p>
                <p className="text-sm font-medium capitalize">{event.status}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
};
