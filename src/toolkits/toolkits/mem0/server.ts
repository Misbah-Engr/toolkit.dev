import { createServerToolkit } from "@/toolkits/create-toolkit";
import { baseMem0ToolkitConfig } from "./base";
import { mem0AddMemoryToolConfigServer } from "./tools/add_memory/server";
import { mem0SearchMemoriesToolConfigServer } from "./tools/search_memories/server";
import { Mem0Tools } from "./tools/tools";

export const mem0ToolkitServer = createServerToolkit(
  baseMem0ToolkitConfig,
  async () => {
    return {
      [Mem0Tools.AddMemory]: mem0AddMemoryToolConfigServer,
      [Mem0Tools.SearchMemories]: mem0SearchMemoriesToolConfigServer,
    };
  },
);