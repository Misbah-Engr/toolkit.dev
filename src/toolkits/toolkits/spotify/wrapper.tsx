"use client";

import { useState } from "react";

import { SiSpotify } from "@icons-pack/react-simple-icons";

import { signIn } from "next-auth/react";

import { api } from "@/trpc/react";

import {
  AuthButton,
  AuthRequiredDialog,
} from "@/toolkits/lib/auth-required-dialog";

import type { ClientToolkitWrapper } from "@/toolkits/types";
import { Toolkits } from "../shared";

export const SpotifyWrapper: ClientToolkitWrapper = ({ Item }) => {
  const { data: hasAccount, isLoading } =
    api.accounts.hasProviderAccount.useQuery("spotify");

  const { data: hasAccess, isLoading: isLoadingAccess } =
    api.features.hasFeature.useQuery({
      feature: "spotify",
    });

  const [isAuthRequiredDialogOpen, setIsAuthRequiredDialogOpen] =
    useState(false);
  const [isPrivateBetaDialogOpen, setIsPrivateBetaDialogOpen] =
    useState(false);

  if (isLoading || isLoadingAccess) {
    return <Item isLoading={true} />;
  }

  if (!hasAccess) {
    return (
      <>
        <Item
          isLoading={isLoading || isLoadingAccess}
          onSelect={() => setIsPrivateBetaDialogOpen(true)}
        />
        <AuthRequiredDialog
          isOpen={isPrivateBetaDialogOpen}
          onOpenChange={setIsPrivateBetaDialogOpen}
          Icon={SiSpotify}
          title="Beta Access Required"
          description="We need to add you as a test user on Spotify for us to request sensitive OAuth scopes. Please contact @jsonhedman on X to request access. You can also run the project locally and use your own Spotify account."
          content={null}
        />
      </>
    );
  }

  if (!hasAccount || !hasAccess) {
    return (
      <>
        <Item
          isLoading={false}
          onSelect={() => setIsAuthRequiredDialogOpen(true)}
        />
        <AuthRequiredDialog
          isOpen={isAuthRequiredDialogOpen}
          onOpenChange={setIsAuthRequiredDialogOpen}
          Icon={SiSpotify}
          title="Connect your Spotify account"
          description="This will request read access to your Spotify playlists and profile."
          content={
            <AuthButton
              onClick={() => {
                void signIn("spotify", {
                  callbackUrl: `${window.location.href}?${Toolkits.Spotify}=true`,
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
