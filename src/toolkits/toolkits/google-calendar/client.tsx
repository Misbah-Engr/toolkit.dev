import { Calendar } from "lucide-react";

import { GoogleCalendarTools } from "./tools";
import { createClientToolkit } from "@/toolkits/create-toolkit";
import { baseGoogleCalendarToolkitConfig } from "./base";
import {
  googleCalendarListCalendarsToolConfigClient,
  googleCalendarGetCalendarToolConfigClient,
  googleCalendarListEventsToolConfigClient,
  googleCalendarGetEventToolConfigClient,
  googleCalendarSearchEventsToolConfigClient,
} from "./tools/client";
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
    [GoogleCalendarTools.ListCalendars]:
      googleCalendarListCalendarsToolConfigClient,
    [GoogleCalendarTools.GetCalendar]:
      googleCalendarGetCalendarToolConfigClient,
    [GoogleCalendarTools.ListEvents]: googleCalendarListEventsToolConfigClient,
    [GoogleCalendarTools.GetEvent]: googleCalendarGetEventToolConfigClient,
    [GoogleCalendarTools.SearchEvents]:
      googleCalendarSearchEventsToolConfigClient,
  },
);
