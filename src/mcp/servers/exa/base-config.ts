import { createBaseServerConfig } from "@/mcp/create-server-config";
import { baseSearchTool } from "./tools/search/base";
import { Servers } from "../shared";

export enum ExaTools {
  Search = "search",
}

export const baseExaServerConfig = createBaseServerConfig({
  id: Servers.Exa,
  name: "Exa",
  description:
    "Exa is a tool that can search the web for up-to-date information",
  tools: {
    [ExaTools.Search]: baseSearchTool,
  },
});
