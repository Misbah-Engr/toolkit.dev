import { createServerToolkit } from "@/toolkits/create-toolkit";
import { baseNotionToolkitConfig } from "./base";
import {
  notionListDatabasesToolConfigServer,
  notionQueryDatabaseToolConfigServer,
  notionCreateDatabaseToolConfigServer,
  notionGetPageToolConfigServer,
  notionSearchPagesToolConfigServer,
  notionCreatePageToolConfigServer,
  notionGetBlocksToolConfigServer,
  notionAppendBlocksToolConfigServer,
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
    if (!account.access_token) {
      throw new Error("No Notion access token found");
    }

    const notion = new Client({
      auth: account.access_token,
    });

    return {
      [NotionTools.ListDatabases]: notionListDatabasesToolConfigServer(notion),
      [NotionTools.QueryDatabase]: notionQueryDatabaseToolConfigServer(notion),
      [NotionTools.CreateDatabase]: notionCreateDatabaseToolConfigServer(notion),
      [NotionTools.GetPage]: notionGetPageToolConfigServer(notion),
      [NotionTools.SearchPages]: notionSearchPagesToolConfigServer(notion),
      [NotionTools.CreatePage]: notionCreatePageToolConfigServer(notion),
      [NotionTools.GetBlocks]: notionGetBlocksToolConfigServer(notion),
      [NotionTools.AppendBlocks]: notionAppendBlocksToolConfigServer(notion),
      [NotionTools.ListUsers]: notionListUsersToolConfigServer(notion),
    };
  },
);
