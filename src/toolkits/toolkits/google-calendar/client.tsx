import { Calendar } from "lucide-react";

import { GoogleCalendarTools } from "./tools";
import { createClientToolkit } from "@/toolkits/create-toolkit";
import { baseGoogleCalendarToolkitConfig } from "./base";
// import { googleCalendarListCalendarsToolConfigClient } from "./tools/list-calendars/client";
// import { googleCalendarGetCalendarToolConfigClient } from "./tools/get-calendar/client";
// import { googleCalendarListEventsToolConfigClient } from "./tools/list-events/client";
// import { googleCalendarGetEventToolConfigClient } from "./tools/get-event/client";
// import { googleCalendarSearchEventsToolConfigClient } from "./tools/search-events/client";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

const calendarScope = "https://www.googleapis.com/auth/calendar";

export const googleCalendarClientToolkit = createClientToolkit(
  baseGoogleCalendarToolkitConfig,
  {
    name: "Google Calendar",
    description: "Access and manage your Google Calendar events and calendars.",
    icon: Calendar,
    form: null,
    addToolkitWrapper: ({ children }) => {
      const { data: account, isLoading } =
        api.accounts.getAccountByProvider.useQuery("google");

      if (isLoading) {
        return (
          <Button variant="outline" size="sm" disabled>
            <Loader2 className="size-4 animate-spin" />
          </Button>
        );
      }

      if (!account) {
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              void signIn(
                "google",
                {
                  callbackUrl: window.location.href,
                },
                {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code",
                  include_granted_scopes: true,
                  scope: `openid email profile ${calendarScope}`,
                },
              );
            }}
          >
            <Calendar className="size-4" />
            Connect
          </Button>
        );
      }

      if (!account?.scope?.includes(calendarScope)) {
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              void signIn(
                "google",
                {
                  callbackUrl: window.location.href,
                },
                {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code",
                  include_granted_scopes: true,
                  scope: `${account?.scope} ${calendarScope}`,
                },
              );
            }}
          >
            <Calendar className="size-4" />
            Grant Calendar Access
          </Button>
        );
      }

      return children;
    },
  },
  {
    // TODO: Implement client components
    [GoogleCalendarTools.ListCalendars]: {
      CallComponent: () => <div>Listing calendars...</div>,
      ResultComponent: () => <div>Calendar list result</div>,
    },
    [GoogleCalendarTools.GetCalendar]: {
      CallComponent: () => <div>Getting calendar...</div>,
      ResultComponent: () => <div>Calendar details result</div>,
    },
    [GoogleCalendarTools.ListEvents]: {
      CallComponent: () => <div>Listing events...</div>,
      ResultComponent: () => <div>Events list result</div>,
    },
    [GoogleCalendarTools.GetEvent]: {
      CallComponent: () => <div>Getting event...</div>,
      ResultComponent: () => <div>Event details result</div>,
    },
    [GoogleCalendarTools.SearchEvents]: {
      CallComponent: () => <div>Searching events...</div>,
      ResultComponent: () => <div>Search results</div>,
    },
  },
);
