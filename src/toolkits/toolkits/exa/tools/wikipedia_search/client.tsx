import React from "react";
import { Globe } from "lucide-react";
import type { baseWikipediaSearchTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { HStack, VStack } from "@/components/ui/stack";

export const exaWikipediaSearchToolConfigClient: ClientToolConfig<
  typeof baseWikipediaSearchTool.inputSchema.shape,
  typeof baseWikipediaSearchTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <HStack className="gap-2">
        <Globe className="text-muted-foreground size-4" />
        <VStack className="items-start gap-0">
          <span className="text-muted-foreground/80 text-xs font-medium">
            Wikipedia Search
          </span>
          <span className="text-sm">&quot;{args.query}&quot;</span>
        </VStack>
      </HStack>
    );
  },
  ResultComponent: ({ result }) => {
    if (!result.results.length) {
      return (
        <div className="text-muted-foreground">No Wikipedia articles found</div>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-muted-foreground text-sm font-medium">
          Wikipedia Articles
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
