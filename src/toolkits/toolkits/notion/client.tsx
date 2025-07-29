import { SiNotion } from "@icons-pack/react-simple-icons";

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

import { NotionWrapper } from "./wrapper";
import { Link } from "../components/link";

export const notionClientToolkit = createClientToolkit(
  baseNotionToolkitConfig,
  {
    name: "Notion",
    description: "Query and create pages and databases",
    icon: SiNotion,
    form: null,
    Wrapper: NotionWrapper,
    type: ToolkitGroups.KnowledgeBase,
    envVars: [
      {
        type: "all",
        keys: ["AUTH_NOTION_ID", "AUTH_NOTION_SECRET"],
        description: (
          <span>
            Get an Auth Notion ID from{" "}
            <Link href="https://www.notion.so/my-integrations">here</Link>
          </span>
        ),
      },
    ],
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
