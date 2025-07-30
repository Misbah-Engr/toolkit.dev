"use client";

import { useState } from "react";

import { SiGoogledrive } from "@icons-pack/react-simple-icons";

import { signIn } from "next-auth/react";

import { api } from "@/trpc/react";

import {
  AuthButton,
  AuthRequiredDialog,
} from "@/toolkits/lib/auth-required-dialog";

import { Toolkits } from "../shared";

import type { ClientToolkitWrapper } from "@/toolkits/types";

const driveScope = "https://www.googleapis.com/auth/drive.readonly";

export const GoogleDriveWrapper: ClientToolkitWrapper = ({ Item }) => {
  const { data: account, isLoading: isLoadingAccount } =
    api.accounts.getAccountByProvider.useQuery("google");

  const { data: hasAccess, isLoading: isLoadingAccess } =
    api.features.hasFeature.useQuery({
      feature: "google-drive",
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
          Icon={SiGoogledrive}
          title="Beta Access Required"
          description="We need to add you as a test user on Google Cloud for us to request sensitive OAuth scopes. Please contact @jsonhedman on X to request access. You can also run the project locally and use your own Google Cloud project."
          content={null}
        />
      </>
    );
  }

  if (!account?.scope?.includes(driveScope)) {
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
          Icon={SiGoogledrive}
          title="Connect your Google Drive"
          description={
            isMissingAccount
              ? "This will request read-only access to your Google Drive."
              : "This will request read access to your Google Drive."
          }
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
                      ? `openid email profile ${driveScope}`
                      : `${account?.scope} ${driveScope}`,
                  },
                );
              }}
            >
              {isMissingAccount ? "Connect your Google Drive" : "Grant Access"}
            </AuthButton>
          }
        />
      </>
    );
  }

  return <Item isLoading={false} />;
};
