import { Terminal } from "lucide-react";

import { E2BTools } from "./tools/tools";
import { createClientToolkit } from "@/toolkits/create-toolkit";
import { e2bRunCodeToolConfigClient } from "./tools/run_code/client";
import { baseE2BToolkitConfig } from "./base";
import { ToolkitGroups } from "@/toolkits/types";

export const e2bClientToolkit = createClientToolkit(
  baseE2BToolkitConfig,
  {
    name: "Code Interpreter",
    description: "Execute python code in a secure environment",
    icon: Terminal,
    form: null,
    type: ToolkitGroups.Native,
    envVars: ["E2B_API_KEY"],
  },
  {
    [E2BTools.RunCode]: e2bRunCodeToolConfigClient,
  },
);
