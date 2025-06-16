import type { ToolkitConfig } from "@/toolkits/types";
import { z } from "zod";
import { NotionTools } from "./tools";
import {
  listDatabasesTool,
  queryDatabaseTool,
  getPageTool,
  getBlocksTool,
  searchPagesTool,
  listUsersTool,
} from "./tools";

export const notionParameters = z.object({});

export const baseNotionToolkitConfig: ToolkitConfig<
  NotionTools,
  typeof notionParameters.shape
> = {
  tools: {
    [NotionTools.ListDatabases]: listDatabasesTool,
    [NotionTools.QueryDatabase]: queryDatabaseTool,
    [NotionTools.GetPage]: getPageTool,
    [NotionTools.GetBlocks]: getBlocksTool,
    [NotionTools.SearchPages]: searchPagesTool,
    [NotionTools.ListUsers]: listUsersTool,
  },
  parameters: notionParameters,
};