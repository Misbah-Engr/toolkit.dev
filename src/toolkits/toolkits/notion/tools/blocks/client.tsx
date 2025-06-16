import React from "react";
import type { ClientToolConfig } from "@/toolkits/types";
import type { getBlocksTool } from "./base";
import { HStack, VStack } from "@/components/ui/stack";
import { Layers, Archive } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const notionGetBlocksToolConfigClient: ClientToolConfig<
  typeof getBlocksTool.inputSchema.shape,
  typeof getBlocksTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <HStack className="gap-2">
        <Layers className="text-muted-foreground size-4" />
        <VStack className="items-start gap-0">
          <span className="text-muted-foreground/80 text-xs font-medium">
            Get Blocks
          </span>
          <span className="text-sm">{args.block_id?.slice(0, 8)}...</span>
        </VStack>
      </HStack>
    );
  },
  ResultComponent: ({ result }) => {
    if (!result.results.length) {
      return <div className="text-muted-foreground">No blocks found</div>;
    }

    return (
      <div className="">
        <h1 className="text-muted-foreground text-sm font-medium">
          Block Contents
        </h1>
        <div className="flex flex-col">
          {result.results.map((block, index) => (
            <VStack
              key={block.id}
              className="w-full items-start border-b py-2 last:border-b-0"
            >
              <HStack className="w-full items-center gap-2">
                <span className="text-muted-foreground text-xs">
                  #{index + 1}
                </span>
                <Badge variant="outline" className="text-xs">
                  {block.type}
                </Badge>
                {block.archived && (
                  <HStack className="items-center gap-1">
                    <Archive className="size-3 text-amber-500" />
                    <Badge variant="secondary" className="text-xs">
                      Archived
                    </Badge>
                  </HStack>
                )}
                {block.has_children && (
                  <Badge variant="primary" className="text-xs">
                    Has Children
                  </Badge>
                )}
              </HStack>

              <VStack className="items-start gap-1">
                <h3 className="text-sm font-medium">
                  {block.id.slice(0, 8)}...
                </h3>
                <p className="text-muted-foreground/60 text-xs">
                  Updated{" "}
                  {new Date(block.last_edited_time).toLocaleDateString()}
                </p>

                {block.content && Object.keys(block.content).length > 0 && (
                  <div className="w-full">
                    <p className="text-muted-foreground mb-1 text-xs font-medium">
                      Content Preview
                    </p>
                    <div className="bg-muted/30 rounded p-2 font-mono text-xs">
                      {JSON.stringify(block.content, null, 2).slice(0, 100)}
                      {JSON.stringify(block.content).length > 100 && "..."}
                    </div>
                  </div>
                )}
              </VStack>
            </VStack>
          ))}
        </div>
        {result.has_more && (
          <p className="text-muted-foreground mt-2 text-xs">
            More blocks available...
          </p>
        )}
      </div>
    );
  },
};
