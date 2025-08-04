import { Video } from "lucide-react";

import { createClientToolkit } from "@/toolkits/create-toolkit";

import { ToolkitGroups } from "@/toolkits/types";

import { baseVideoToolkitConfig } from "./base";
import { baseGenerateTool, VideoTools } from "./tools";

import { videoEnvVars } from "./env-vars";

export const videoClientToolkit = createClientToolkit(
  baseVideoToolkitConfig,
  {
    name: "Video",
    description: "Generate videos with AI",
    icon: Video,
    form: null,
    type: ToolkitGroups.Native,
    envVars: videoEnvVars,
  },
  {
    [VideoTools.Generate]: {
      ...baseGenerateTool,
      CallComponent: VideoGenerateCall,
      ResultComponent: VideoGenerateResult,
    },
  },
);
