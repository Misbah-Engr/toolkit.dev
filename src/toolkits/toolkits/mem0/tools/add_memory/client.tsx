import React from "react";
import { Plus, User } from "lucide-react";

import type { baseAddMemoryTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { ToolCallDisplay } from "../../components";

export const mem0AddMemoryToolConfigClient: ClientToolConfig<
  typeof baseAddMemoryTool.inputSchema.shape,
  typeof baseAddMemoryTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <div className="space-y-2">
        <ToolCallDisplay icon={Plus} label="Adding Memory" value={args.content} />
        <ToolCallDisplay icon={User} label="User ID" value={args.userId} />
      </div>
    );
  },
  ResultComponent: ({ result }) => {
    return (
      <div className="flex items-center gap-2 p-3 rounded-lg border">
        {result.success ? (
          <div className="flex items-center gap-2 text-green-600">
            <Plus className="h-4 w-4" />
            <span className="text-sm font-medium">{result.message}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-red-600">
            <Plus className="h-4 w-4" />
            <span className="text-sm font-medium">{result.message}</span>
          </div>
        )}
      </div>
    );
  },
};