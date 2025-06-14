import type { ToolkitConfig } from "@/mcp/types";
import { baseSearchTool } from "./tools/search/base";
import { ExaTools } from "./tools/tools";

export const baseExaToolkitConfig: ToolkitConfig<ExaTools> = {
  tools: {
    [ExaTools.Search]: baseSearchTool,
  },
  parameters: {},
};
