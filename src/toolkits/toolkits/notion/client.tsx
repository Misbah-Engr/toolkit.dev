import { NotionTools } from "./tools";
import { createClientToolkit } from "@/toolkits/create-toolkit";
import { baseNotionToolkitConfig } from "./base";
import {
  notionListDatabasesToolConfigClient,
  notionQueryDatabaseToolConfigClient,
  notionGetPageToolConfigClient,
  notionSearchPagesToolConfigClient,
  notionGetBlocksToolConfigClient,
  notionListUsersToolConfigClient,
} from "./tools/client";
import { SiNotion } from "@icons-pack/react-simple-icons";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

export const notionClientToolkit = createClientToolkit(
  baseNotionToolkitConfig,
  {
    name: "Notion",
    description:
      "Access and analyze your Notion workspace, including databases, pages, blocks, and users.",
    icon: SiNotion,
    form: null,
    addToolkitWrapper: ({ children }) => {
      const { data: hasAccount, isLoading } =
        api.accounts.hasProviderAccount.useQuery("notion");

      if (isLoading) {
        return (
          <Button variant="outline" size="sm" disabled>
            <Loader2 className="size-4 animate-spin" />
          </Button>
        );
      }

      if (!hasAccount) {
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              void signIn("notion", {
                callbackUrl: window.location.href,
              });
            }}
          >
            Connect
          </Button>
        );
      }

      return children;
    },
  },
  {
    [NotionTools.ListDatabases]: notionListDatabasesToolConfigClient,
    [NotionTools.QueryDatabase]: notionQueryDatabaseToolConfigClient,
    [NotionTools.GetPage]: notionGetPageToolConfigClient,
    [NotionTools.SearchPages]: notionSearchPagesToolConfigClient,
    [NotionTools.GetBlocks]: notionGetBlocksToolConfigClient,
    [NotionTools.ListUsers]: notionListUsersToolConfigClient,
  },
);
