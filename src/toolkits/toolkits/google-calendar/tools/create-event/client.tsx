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
  CallComponent: ({ args, isPartial }) => {
    if (isPartial || !args.title || !args.startDateTime) {
      return (
        <ToolCallComponent
          action="Creating Event"
          primaryText="New Event"
          secondaryText="No time specified"
        />
      );
    }

    return (
      <ToolCallComponent
        action="Creating Event"
        primaryText={args.title}
        secondaryText={new Date(args.startDateTime).toLocaleString()}
      />
    );
  },
  ResultComponent: ({ result }) => {
    // EventCard now handles optional dateTime fields directly
    const eventForCard = {
      ...result,
      start: result.start,
      end: result.end
    };

    return (
      <div className="w-full space-y-4">
        {/* Success Header */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 border border-green-200 dark:bg-green-950/20 dark:border-green-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30">
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
          
          {result.htmlLink && (
            <Link href={result.htmlLink} target="_blank">
              <Button variant="outline" size="sm" className="text-xs">
                <ExternalLink className="size-3 mr-1" />
                View in Calendar
              </Button>
            </Link>
          )}
        </div>

        {/* Event Details Card */}
        <EventCard event={eventForCard} showDetails={true} />
        
        {/* Event Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border">
            <Calendar className="size-4 text-muted-foreground" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Event ID</p>
              <p className="text-sm font-mono truncate">{result.id}</p>
            </div>
          </div>
          
          {result.attendees && result.attendees.length > 0 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border">
              <Users className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Attendees</p>
                <p className="text-sm font-medium">
                  {result.attendees.length} invite{result.attendees.length !== 1 ? 'd' : 'd'}
                </p>
              </div>
            </div>
          )}
          
          {result.status && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="text-sm font-medium capitalize">{result.status}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
}; 