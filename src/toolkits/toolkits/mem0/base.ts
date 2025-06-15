import type { ToolkitConfig } from "@/toolkits/types";
import { baseAddMemoryTool } from "./tools/add_memory/base";
import { baseSearchMemoriesTool } from "./tools/search_memories/base";
import { Mem0Tools } from "./tools/tools";
import { z } from "zod";

export const mem0Parameters = z.object({});

export const baseMem0ToolkitConfig: ToolkitConfig<
  Mem0Tools,
  typeof mem0Parameters.shape
> = {
  tools: {
    [Mem0Tools.AddMemory]: baseAddMemoryTool,
    [Mem0Tools.SearchMemories]: baseSearchMemoriesTool,
  },
  parameters: mem0Parameters,
};
