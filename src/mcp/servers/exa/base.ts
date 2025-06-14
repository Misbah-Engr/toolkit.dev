import type { ToolkitConfig } from "@/mcp/types";
import { baseSearchTool } from "./tools/search/base";
import { ExaTools } from "./tools/tools";
import { z } from "zod";

export const exaParameters = z.object({});

export const baseExaToolkitConfig: ToolkitConfig<
  ExaTools,
  typeof exaParameters.shape
> = {
  tools: {
    [ExaTools.Search]: baseSearchTool,
  },
  parameters: exaParameters,
};
