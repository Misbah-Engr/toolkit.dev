"use client";

import { useState } from "react";

import { SiDiscord } from "@icons-pack/react-simple-icons";

import { signIn } from "next-auth/react";

import { api } from "@/trpc/react";

import {
  AuthButton,
  AuthRequiredDialog,
} from "@/toolkits/lib/auth-required-dialog";

import type { ClientToolkitWrapper } from "@/toolkits/types";
import { Toolkits } from "../shared";

export const DiscordWrapper: ClientToolkitWrapper = ({ Item }) => {
  const { data: hasAccount, isLoading } =
    api.accounts.hasProviderAccount.useQuery("discord");

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
          Icon={SiDiscord}
          title="Connect your Discord account"
          description="This will request read access to your Discord servers and users."
          content={
            <AuthButton
              onClick={() => {
                void signIn("discord", {
                  callbackUrl: `${window.location.href}?${Toolkits.Discord}=true`,
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
