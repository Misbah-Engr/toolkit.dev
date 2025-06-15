import React from "react";
import { Github } from "lucide-react";
import type { baseGithubSearchTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { HStack, VStack } from "@/components/ui/stack";

export const exaGithubSearchToolConfigClient: ClientToolConfig<
  typeof baseGithubSearchTool.inputSchema.shape,
  typeof baseGithubSearchTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <HStack className="gap-2">
        <Github className="text-muted-foreground size-4" />
        <VStack className="items-start gap-0">
          <span className="text-muted-foreground/80 text-xs font-medium">
            GitHub Search
          </span>
          <span className="text-sm">&quot;{args.query}&quot;</span>
        </VStack>
      </HStack>
    );
  },
  ResultComponent: ({ result }) => {
    if (!result.results.length) {
      return <div className="text-gray-500">No GitHub repositories found</div>;
    }

    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-muted-foreground text-sm font-medium">
          GitHub Repositories
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
