import { baseGenerateTool } from "./tools/generate/base";
import { Servers } from "../shared";
import type { McpServerConfigBase } from "@/mcp/types";
import { ImageIcon } from "lucide-react";

export enum ImageTools {
  Generate = "generate",
}

export const baseImageServerConfig: McpServerConfigBase<ImageTools> = {
  id: Servers.Image,
  name: "Image Generation",
  description: "Image is a tool that can generate images",
  icon: ImageIcon,
  tools: {
    [ImageTools.Generate]: baseGenerateTool,
  },
};
