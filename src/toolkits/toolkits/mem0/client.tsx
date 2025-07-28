import { Brain } from "lucide-react";

import { Link } from "../components/link";

import { Mem0Tools } from "./tools/tools";
import { createClientToolkit } from "@/toolkits/create-toolkit";
import { mem0AddMemoryToolConfigClient } from "./tools/add_memory/client";
import { mem0SearchMemoriesToolConfigClient } from "./tools/search_memories/client";
import { baseMem0ToolkitConfig } from "./base";
import { ToolkitGroups } from "@/toolkits/types";

export const mem0ClientToolkit = createClientToolkit(
  baseMem0ToolkitConfig,
  {
    name: "Memory",
    description: "Personalize your experience with each conversation.",
    icon: ({ className }) => <Brain className={className} />,
    form: null,
    type: ToolkitGroups.Native,
    envVars: [
      {
        type: "all",
        keys: ["MEM0_API_KEY"],
        description: (
          <span>
            Get an Mem0 API Key{" "}
            <Link href="https://app.mem0.ai/dashboard/api-keys">here</Link>
          </span>
        ),
      },
    ],
  },
  {
    [Mem0Tools.AddMemory]: mem0AddMemoryToolConfigClient,
    [Mem0Tools.SearchMemories]: mem0SearchMemoriesToolConfigClient,
  },
);
