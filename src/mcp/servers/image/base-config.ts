import { baseGenerateTool } from "./tools/generate/base";
import { Servers } from "../shared";
import type { McpServerConfigBase } from "@/mcp/types";

export enum ImageTools {
  Generate = "generate",
}

export const baseImageServerConfig: McpServerConfigBase<ImageTools> = {
  id: Servers.Image,
  name: "Image",
  description: "Image is a tool that can generate images",
  tools: {
    [ImageTools.Generate]: baseGenerateTool,
  },
};
