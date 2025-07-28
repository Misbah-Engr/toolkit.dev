"use client";

import { useState } from "react";

import { SiGithub } from "@icons-pack/react-simple-icons";

import { signIn } from "next-auth/react";

import { api } from "@/trpc/react";

import {
  AuthButton,
  AuthRequiredDialog,
} from "@/toolkits/lib/auth-required-dialog";

import type { ClientToolkitWrapper } from "@/toolkits/types";
import { Toolkits } from "../shared";

export const GithubWrapper: ClientToolkitWrapper = ({ Item }) => {
  const { data: hasAccount, isLoading } =
    api.accounts.hasProviderAccount.useQuery("github");

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
          Icon={SiGithub}
          title="Connect your GitHub account"
          description="This will request read access to public repositories and users."
          content={
            <AuthButton
              onClick={() => {
                void signIn("github", {
                  callbackUrl: `${window.location.href}?${Toolkits.Github}=true`,
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
