"use client";

import { useState } from "react";

import { SiGooglecalendar } from "@icons-pack/react-simple-icons";

import { signIn } from "next-auth/react";

import { api } from "@/trpc/react";

import {
  AuthButton,
  AuthRequiredDialog,
} from "@/toolkits/lib/auth-required-dialog";

import type { ClientToolkitWrapper } from "@/toolkits/types";
import { Toolkits } from "../shared";

const calendarScope = "https://www.googleapis.com/auth/calendar";

export const GoogleCalendarWrapper: ClientToolkitWrapper = ({ Item }) => {
  const { data: account, isLoading: isLoadingAccount } =
    api.accounts.getAccountByProvider.useQuery("google");

  const { data: hasAccess, isLoading: isLoadingAccess } =
    api.features.hasFeature.useQuery({
      feature: "google-calendar",
    });

  const [isPrivateBetaDialogOpen, setIsPrivateBetaDialogOpen] = useState(false);
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
          description="We need to add you as a test user on Google Cloud for us to request sensitive OAuth scopes. Please contact @jsonhedman on X to request access. You can also run the project locally and use your own Google Cloud project."
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
};
