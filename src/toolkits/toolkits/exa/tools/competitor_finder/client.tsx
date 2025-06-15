import React from "react";
import { Users } from "lucide-react";
import type { baseCompetitorFinderTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
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
            <div key={index} className="border-l-2 pl-2">
              <h3 className="text-sm font-medium">{item.title}</h3>
              <p className="text-muted-foreground truncate text-xs">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
