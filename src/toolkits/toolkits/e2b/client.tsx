import { Terminal } from "lucide-react";

import { E2BTools } from "./tools/tools";
import { createClientToolkit } from "@/toolkits/create-toolkit";
import { e2bRunCodeToolConfigClient } from "./tools/run_code/client";
import { baseE2BToolkitConfig } from "./base";

export const e2bClientToolkit = createClientToolkit(
  baseE2BToolkitConfig,
  {
    name: "Code Interpreter",
    description:
      "Execute code in a secure E2B sandbox environment with full package support.",
    icon: Terminal,
    form: null,
  },
  {
    [E2BTools.RunCode]: e2bRunCodeToolConfigClient,
  },
);
