import type { ToolkitConfig } from "@/mcp/types";
import { ImageTools } from "./tools/tools";
import { baseGenerateTool } from "./tools/generate/base";

export const baseImageToolkitConfig: ToolkitConfig<ImageTools> = {
  tools: {
    [ImageTools.Generate]: baseGenerateTool,
  },
  parameters: {},
};
