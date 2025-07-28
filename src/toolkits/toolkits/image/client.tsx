import { ImageIcon } from "lucide-react";

import { ImageTools } from "./tools/tools";
import { createClientToolkit } from "@/toolkits/create-toolkit";
import { generateToolConfigClient } from "./tools/generate/client";
import { baseImageToolkitConfig } from "./base";
import { ToolkitGroups } from "@/toolkits/types";
import { Form } from "./form";

export const imageClientToolkit = createClientToolkit<
  ImageTools,
  typeof baseImageToolkitConfig.parameters.shape
>(
  baseImageToolkitConfig,
  {
    name: "Image Generation",
    description: "Let your creativity flow",
    icon: ImageIcon,
    form: Form,
    type: ToolkitGroups.Native,
    envVars: [
      [
        "FAL_API_KEY",
        "FIREWORKS_API_KEY",
        "LUMA_API_KEY",
        "OPENAI_API_KEY",
        "XAI_API_KEY",
      ],
      ["BLOB_READ_WRITE_TOKEN"],
    ],
  },
  {
    [ImageTools.Generate]: generateToolConfigClient,
  },
);
