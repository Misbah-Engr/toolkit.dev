import React from "react";
import type { ClientToolConfig } from "@/toolkits/types";
import type { getBlocksTool } from "./base";
import { Layers } from "lucide-react";
import { ToolCallDisplay } from "../../components";
import { NotionBlock } from "../../components/block";

export const notionGetBlocksToolConfigClient: ClientToolConfig<
  typeof getBlocksTool.inputSchema.shape,
  typeof getBlocksTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <ToolCallDisplay
        icon={Layers}
        label="Get Blocks"
        value={`${(args.block_id ?? "").slice(0, 8)}...`}
      />
    );
  },
  ResultComponent: ({ result }) => {
    if (!result.results.length) {
      return <div className="text-muted-foreground">No blocks found</div>;
    }

    return (
      <div className="">
        <div className="flex flex-col">
          {result.results.map((block) => (
            <NotionBlock key={block.id} block={block} />
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
