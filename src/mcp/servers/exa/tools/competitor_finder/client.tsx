import React from "react";
import { Users } from "lucide-react";
import type { baseCompetitorFinderTool } from "./base";
import type { ClientToolConfig } from "@/mcp/types";
import { HStack, VStack } from "@/components/ui/stack";

export const exaCompetitorFinderToolConfigClient: ClientToolConfig<
  typeof baseCompetitorFinderTool.inputSchema.shape,
  typeof baseCompetitorFinderTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <HStack className="gap-2">
        <Users className="text-muted-foreground size-4" />
        <VStack className="items-start gap-0">
          <span className="text-muted-foreground/80 text-xs font-medium">
            Competitor Analysis
          </span>
          <span className="text-sm">&quot;{args.company}&quot;</span>
        </VStack>
      </HStack>
    );
  },
  ResultComponent: ({ result }) => {
    if (!result.results.length) {
      return <div className="text-gray-500">No competitors found</div>;
    }

    return (
      <div className="">
        <h1 className="text-muted-foreground text-sm font-medium">
          Competitors Found
        </h1>
        <div className="flex flex-col gap-2">
          {result.results.map((item, index) => (
            <div key={index} className="border-l-2 border-red-200 pl-3">
              <h3 className="font-medium text-sm">{item.title}</h3>
              <p className="text-xs text-gray-600 truncate">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  },
};