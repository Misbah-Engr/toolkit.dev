import { createServerToolkit } from "@/toolkits/create-toolkit";
import { baseNotionToolkitConfig } from "./base";
import {
  notionListDatabasesToolConfigServer,
  notionQueryDatabaseToolConfigServer,
  notionGetPageToolConfigServer,
  notionSearchPagesToolConfigServer,
  notionGetBlocksToolConfigServer,
  notionListUsersToolConfigServer,
} from "./tools/server";
import { NotionTools } from "./tools";
import { api } from "@/trpc/server";
import { Client } from "@notionhq/client";

export const notionToolkitServer = createServerToolkit(
  baseNotionToolkitConfig,
  async () => {
    const account = await api.accounts.getAccountByProvider("notion");

    if (!account) {
      throw new Error("No Notion account found");
    }

    const notion = new Client({
      auth: account.access_token,
    });

    return {
      [NotionTools.ListDatabases]: notionListDatabasesToolConfigServer(notion),
      [NotionTools.QueryDatabase]: notionQueryDatabaseToolConfigServer(notion),
      [NotionTools.GetPage]: notionGetPageToolConfigServer(notion),
      [NotionTools.SearchPages]: notionSearchPagesToolConfigServer(notion),
      [NotionTools.GetBlocks]: notionGetBlocksToolConfigServer(notion),
      [NotionTools.ListUsers]: notionListUsersToolConfigServer(notion),
    };
  },
);