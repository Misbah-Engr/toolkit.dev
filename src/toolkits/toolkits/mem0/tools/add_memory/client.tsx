import React from "react";
import { Plus } from "lucide-react";

import type { baseAddMemoryTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { ToolCallDisplay } from "../../components/tool-call-display";
import { HStack, VStack } from "@/components/ui/stack";

export const mem0AddMemoryToolConfigClient: ClientToolConfig<
  typeof baseAddMemoryTool.inputSchema.shape,
  typeof baseAddMemoryTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <div className="space-y-2">
        <ToolCallDisplay
          icon={Plus}
          label="Adding Memory"
          value={args.content ?? "..."}
        />
      </div>
    );
  },
  ResultComponent: ({ result }) => {
    return (
      <div className="flex items-center gap-2">
        {result.success ? (
          <HStack className="text-primary flex items-center gap-2">
            <Plus className="size-4 shrink-0" />
            <VStack className="items-start gap-0">
              <span className="text-xs font-medium">Memory Added</span>
              <span className="text-muted-foreground text-sm">
                {result.content}
              </span>
            </VStack>
          </HStack>
        ) : (
          <HStack className="text-destructive flex items-center gap-2">
            <Plus className="size-4" />
            <VStack className="items-start gap-0">
              <span className="text-xs font-medium">Failed to add memory</span>
              <span className="text-muted-foreground text-sm">
                {result.content}
              </span>
            </VStack>
          </HStack>
        )}
      </div>
    );
  },
};
