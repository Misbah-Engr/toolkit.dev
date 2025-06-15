import { createServerToolkit } from "@/toolkits/create-toolkit";
import { baseMem0ToolkitConfig } from "./base";
import { mem0AddMemoryToolConfigServer } from "./tools/add_memory/server";
import { mem0SearchMemoriesToolConfigServer } from "./tools/search_memories/server";
import { Mem0Tools } from "./tools/tools";
import { auth } from "@/server/auth";

export const mem0ToolkitServer = createServerToolkit(
  baseMem0ToolkitConfig,
  async () => {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("User not found");
    }

    return {
      [Mem0Tools.AddMemory]: mem0AddMemoryToolConfigServer(session.user.id),
      [Mem0Tools.SearchMemories]: mem0SearchMemoriesToolConfigServer(
        session.user.id,
      ),
    };
  },
);
