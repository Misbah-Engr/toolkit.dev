import React from "react";
import { Link } from "lucide-react";
import type { baseCrawlingTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { HStack, VStack } from "@/components/ui/stack";

export const exaCrawlingToolConfigClient: ClientToolConfig<
  typeof baseCrawlingTool.inputSchema.shape,
  typeof baseCrawlingTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <HStack className="gap-2">
        <Link className="text-muted-foreground size-4" />
        <VStack className="items-start gap-0">
          <span className="text-muted-foreground/80 text-xs font-medium">
            Crawling URLs
          </span>
          <span className="text-sm">&quot;{args.urls.join(", ")}&quot;</span>
        </VStack>
      </HStack>
    );
  },
  ResultComponent: ({ result }) => {
    if (!result.results.length) {
      return <div className="text-gray-500">No content extracted</div>;
    }

    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-muted-foreground text-sm font-medium">
          Extracted Content
        </h1>
        <div className="flex flex-col gap-2">
          {result.results.map((item, index) => (
            <div key={index} className="border-l-2 pl-2">
              <h3 className="text-sm font-medium">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
