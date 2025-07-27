"use client";

import { useState } from "react";
import { SiStrava } from "@icons-pack/react-simple-icons";
import { signIn } from "next-auth/react";
import { api } from "@/trpc/react";
import {
  AuthButton,
  AuthRequiredDialog,
} from "@/toolkits/lib/auth-required-dialog";
import type { ClientToolkitWrapper } from "@/toolkits/types";
import { Toolkits } from "../shared";

export const StravaWrapper: ClientToolkitWrapper = ({ Item }) => {
  const { data: hasAccount, isLoading } =
    api.accounts.hasProviderAccount.useQuery("strava");

  const [isAuthRequiredDialogOpen, setIsAuthRequiredDialogOpen] =
    useState(false);

  if (isLoading) {
    return <Item isLoading={true} />;
  }

  if (!hasAccount) {
    return (
      <>
        <Item
          isLoading={false}
          onSelect={() => setIsAuthRequiredDialogOpen(true)}
        />
        <AuthRequiredDialog
          isOpen={isAuthRequiredDialogOpen}
          onOpenChange={setIsAuthRequiredDialogOpen}
          Icon={SiStrava}
          title="Connect your Strava account"
          description="Access your activities and performance data."
          content={
            <AuthButton
              onClick={() => {
                void signIn("strava", {
                  callbackUrl: `${window.location.href}?${Toolkits.Strava}=true`,
                });
              }}
            >
              Connect
            </AuthButton>
          }
        />
      </>
    );
  }

  return <Item isLoading={false} />;
}; 