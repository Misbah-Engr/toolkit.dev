"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";

import { SiNotion } from "@icons-pack/react-simple-icons";

import { api } from "@/trpc/react";

import { createClientToolkit } from "@/toolkits/create-toolkit";

import { NotionTools } from "./tools";
import { baseNotionToolkitConfig } from "./base";
import {
  notionListDatabasesToolConfigClient,
  notionQueryDatabaseToolConfigClient,
  notionCreateDatabaseToolConfigClient,
  notionGetPageToolConfigClient,
  notionSearchPagesToolConfigClient,
  notionCreatePageToolConfigClient,
  notionGetBlocksToolConfigClient,
  notionAppendBlocksToolConfigClient,
  notionListUsersToolConfigClient,
} from "./tools/client";
import { ToolkitGroups } from "@/toolkits/types";

import {
  AuthButton,
  AuthRequiredDialog,
} from "@/toolkits/lib/auth-required-dialog";

export const notionClientToolkit = createClientToolkit(
  baseNotionToolkitConfig,
  {
    name: "Notion",
    description: "Query and create pages and databases",
    icon: SiNotion,
    form: null,
    Wrapper: ({ Item }) => {
      const { data: hasAccount, isLoading } =
        api.accounts.hasProviderAccount.useQuery("notion");

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
              Icon={SiNotion}
              title="Connect your Notion account"
              description="This will request read and write access to your Notion pages."
              content={
                <AuthButton
                  onClick={() => {
                    void signIn("notion", {
                      callbackUrl: window.location.href,
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
    type: ToolkitGroups.KnowledgeBase,
  },
  {
    [NotionTools.ListDatabases]: notionListDatabasesToolConfigClient,
    [NotionTools.QueryDatabase]: notionQueryDatabaseToolConfigClient,
    [NotionTools.CreateDatabase]: notionCreateDatabaseToolConfigClient,
    [NotionTools.GetPage]: notionGetPageToolConfigClient,
    [NotionTools.SearchPages]: notionSearchPagesToolConfigClient,
    [NotionTools.CreatePage]: notionCreatePageToolConfigClient,
    [NotionTools.GetBlocks]: notionGetBlocksToolConfigClient,
    [NotionTools.AppendBlocks]: notionAppendBlocksToolConfigClient,
    [NotionTools.ListUsers]: notionListUsersToolConfigClient,
  },
);
