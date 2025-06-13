import { baseSearchTool } from "./tools/search/base";
import { Servers } from "../shared";
import type { McpServerConfigBase } from "@/mcp/types";

export enum ExaTools {
  Search = "search",
}

export const baseExaServerConfig: McpServerConfigBase<ExaTools> = {
  id: Servers.Exa,
  name: "Exa",
  description:
    "Exa is a tool that can search the web for up-to-date information",
  tools: {
    [ExaTools.Search]: baseSearchTool,
  },
};
