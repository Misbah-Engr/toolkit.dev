import { Terminal } from "lucide-react";

import { Link } from "../components/link";

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
    envVars: [
      {
        type: "all",
        keys: ["E2B_API_KEY"],
        description: (
          <span>
            Get an E2B API Key{" "}
            <Link href="https://e2b.dev/docs/api-key">here</Link>
          </span>
        ),
      },
    ],
  },
  {
    [E2BTools.RunCode]: e2bRunCodeToolConfigClient,
  },
);
