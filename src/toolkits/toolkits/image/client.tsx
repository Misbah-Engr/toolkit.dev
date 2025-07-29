import { ImageIcon } from "lucide-react";

import { ImageTools } from "./tools/tools";
import { createClientToolkit } from "@/toolkits/create-toolkit";
import { generateToolConfigClient } from "./tools/generate/client";
import { baseImageToolkitConfig } from "./base";
import { ToolkitGroups } from "@/toolkits/types";
import { Form } from "./form";
import { imageEnvVars } from "./env-vars";

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
    envVars: imageEnvVars,
  },
  {
    [ImageTools.Generate]: generateToolConfigClient,
  },
);
