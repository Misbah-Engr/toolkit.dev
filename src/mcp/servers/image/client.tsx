import { ImageIcon } from "lucide-react";

import { ImageTools } from "./tools/tools";
import { createClientToolkit } from "@/mcp/create-toolkit";
import { generateToolConfigClient } from "./tools/generate/client";
import { baseImageToolkitConfig } from "./base";

export const imageClientToolkit = createClientToolkit(
  baseImageToolkitConfig,
  {
    name: "Image Generation",
    description: "Image Generation is a tool that can generate images",
    icon: ImageIcon,
  },
  {
    [ImageTools.Generate]: generateToolConfigClient,
  },
);
