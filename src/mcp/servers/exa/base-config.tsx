import Image from "next/image";

import { baseSearchTool } from "./tools/search/base";
import { Servers } from "../shared";
import type { McpServerConfigBase } from "@/mcp/types";

export enum ExaTools {
  Search = "search",
}

export const baseExaServerConfig: McpServerConfigBase<ExaTools> = {
  id: Servers.Exa,
  name: "Exa Search",
  description:
    "Exa is a tool that can search the web for up-to-date information",
  icon: ({ className }) => (
    <Image
      src="/icons/exa.png"
      alt="Exa"
      className={className}
      width={24}
      height={24}
    />
  ),
  tools: {
    [ExaTools.Search]: baseSearchTool,
  },
};
