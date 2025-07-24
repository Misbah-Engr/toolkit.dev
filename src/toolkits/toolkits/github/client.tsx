"use client";

import { useState } from "react";

import { SiGithub } from "@icons-pack/react-simple-icons";

import { signIn } from "next-auth/react";

import { createClientToolkit } from "@/toolkits/create-toolkit";

import { Toolkits } from "../shared";

import { baseGithubToolkitConfig } from "./base";
import { GithubTools } from "./tools";
import {
  githubSearchReposToolConfigClient,
  githubRepoInfoToolConfigClient,
  githubSearchCodeToolConfigClient,
  githubSearchUsersToolConfigClient,
} from "./tools/client";

import { ToolkitGroups } from "@/toolkits/types";
import {
  AuthButton,
  AuthRequiredDialog,
} from "@/toolkits/lib/auth-required-dialog";

import { api } from "@/trpc/react";

export const githubClientToolkit = createClientToolkit(
  baseGithubToolkitConfig,
  {
    name: "GitHub",
    description: "Find and analyze repositories, users, and organizations",
    icon: SiGithub,
    form: null,
    Wrapper: ({ Item }) => {
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
    },
    type: ToolkitGroups.DataSource,
  },
  {
    [GithubTools.SearchRepos]: githubSearchReposToolConfigClient,
    [GithubTools.RepoInfo]: githubRepoInfoToolConfigClient,
    [GithubTools.SearchCode]: githubSearchCodeToolConfigClient,
    [GithubTools.SearchUsers]: githubSearchUsersToolConfigClient,
  },
);
