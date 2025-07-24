"use client";

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
import { signIn } from "next-auth/react";
import { SiGooglecalendar } from "@icons-pack/react-simple-icons";
import { ToolkitGroups } from "@/toolkits/types";
import { Toolkits } from "../shared";
import {
  AuthButton,
  AuthRequiredDialog,
} from "@/toolkits/lib/auth-required-dialog";
import { useState } from "react";

const calendarScope = "https://www.googleapis.com/auth/calendar";

export const googleCalendarClientToolkit = createClientToolkit(
  baseGoogleCalendarToolkitConfig,
  {
    name: "Google Calendar",
    description: "Find availability and schedule meetings",
    icon: SiGooglecalendar,
    form: null,
    Wrapper: ({ Item }) => {
      const { data: account, isLoading: isLoadingAccount } =
        api.accounts.getAccountByProvider.useQuery("google");

      const { data: hasAccess, isLoading: isLoadingAccess } =
        api.features.hasFeature.useQuery({
          feature: "google-calendar",
        });

      const [isPrivateBetaDialogOpen, setIsPrivateBetaDialogOpen] =
        useState(false);
      const [isAuthRequiredDialogOpen, setIsAuthRequiredDialogOpen] =
        useState(false);

      if (isLoadingAccount || isLoadingAccess) {
        return <Item isLoading={true} />;
      }

      if (!hasAccess) {
        return (
          <>
            <Item
              isLoading={isLoadingAccount || isLoadingAccess}
              onSelect={() => setIsPrivateBetaDialogOpen(true)}
            />
            <AuthRequiredDialog
              isOpen={isPrivateBetaDialogOpen}
              onOpenChange={setIsPrivateBetaDialogOpen}
              Icon={SiGooglecalendar}
              title="Beta Access Required"
              description="We need to add you as a test user on Google Cloud for us to request sensitive OAuth scopes. Please contact @jsonhedman on X to request access."
              content={null}
            />
          </>
        );
      }

      if (!account?.scope?.includes(calendarScope)) {
        const isMissingAccount = !account;
        return (
          <>
            <Item
              isLoading={false}
              onSelect={() => setIsAuthRequiredDialogOpen(true)}
            />
            <AuthRequiredDialog
              isOpen={isAuthRequiredDialogOpen}
              onOpenChange={setIsAuthRequiredDialogOpen}
              Icon={SiGooglecalendar}
              title="Connect your Google Calendar"
              description="This will request read and write access to your Google Calendar."
              content={
                <AuthButton
                  onClick={() => {
                    void signIn(
                      "google",
                      {
                        callbackUrl: `${window.location.href}?${Toolkits.GoogleCalendar}=true`,
                      },
                      {
                        prompt: "consent",
                        access_type: "offline",
                        response_type: "code",
                        include_granted_scopes: true,
                        scope: isMissingAccount
                          ? `openid email profile ${calendarScope}`
                          : `${account?.scope} ${calendarScope}`,
                      },
                    );
                  }}
                >
                  {isMissingAccount
                    ? "Connect your Google Calendar"
                    : "Grant Access"}
                </AuthButton>
              }
            />
          </>
        );
      }

      return <Item isLoading={false} />;
    },
    type: ToolkitGroups.DataSource,
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
