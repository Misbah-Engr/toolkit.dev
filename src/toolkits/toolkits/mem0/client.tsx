import { Brain } from "lucide-react";

import { Mem0Tools } from "./tools/tools";
import { createClientToolkit } from "@/toolkits/create-toolkit";
import { mem0AddMemoryToolConfigClient } from "./tools/add_memory/client";
import { mem0SearchMemoriesToolConfigClient } from "./tools/search_memories/client";
import { baseMem0ToolkitConfig } from "./base";

export const mem0ClientToolkit = createClientToolkit(
  baseMem0ToolkitConfig,
  {
    name: "Memory",
    description:
      "Memory is a memory toolkit that allows you to store and retrieve memories for personalized conversations. It can remember user preferences, past conversations, and context for better interactions.",
    icon: ({ className }) => <Brain className={className} />,
    form: null,
  },
  {
    [Mem0Tools.AddMemory]: mem0AddMemoryToolConfigClient,
    [Mem0Tools.SearchMemories]: mem0SearchMemoriesToolConfigClient,
  },
);
