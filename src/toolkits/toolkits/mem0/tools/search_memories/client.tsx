import React from "react";
import { Search } from "lucide-react";

import type { baseSearchMemoriesTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { ToolCallDisplay, MemoryList } from "../../components";

export const mem0SearchMemoriesToolConfigClient: ClientToolConfig<
  typeof baseSearchMemoriesTool.inputSchema.shape,
  typeof baseSearchMemoriesTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <div className="space-y-2">
        <ToolCallDisplay
          icon={Search}
          label="Search Query"
          value={args.query}
        />
      </div>
    );
  },
  ResultComponent: ({ result }) => {
    return (
      <MemoryList
        memories={result.memories}
        title="Found Memories"
        emptyMessage={result.message}
      />
    );
  },
};
