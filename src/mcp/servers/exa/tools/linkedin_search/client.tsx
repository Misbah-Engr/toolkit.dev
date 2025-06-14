import React from "react";
import { Linkedin } from "lucide-react";
import type { baseLinkedinSearchTool } from "./base";
import type { ClientToolConfig } from "@/mcp/types";
import { HStack, VStack } from "@/components/ui/stack";

export const exaLinkedinSearchToolConfigClient: ClientToolConfig<
  typeof baseLinkedinSearchTool.inputSchema.shape,
  typeof baseLinkedinSearchTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <HStack className="gap-2">
        <Linkedin className="text-muted-foreground size-4" />
        <VStack className="items-start gap-0">
          <span className="text-muted-foreground/80 text-xs font-medium">
            LinkedIn Search
          </span>
          <span className="text-sm">&quot;{args.query}&quot;</span>
        </VStack>
      </HStack>
    );
  },
  ResultComponent: ({ result }) => {
    if (!result.results.length) {
      return <div className="text-gray-500">No LinkedIn profiles found</div>;
    }

    return (
      <div className="">
        <h1 className="text-muted-foreground text-sm font-medium">
          LinkedIn Results
        </h1>
        <div className="flex flex-col gap-2">
          {result.results.map((item, index) => (
            <div key={index} className="border-l-2 border-blue-600 pl-3">
              <h3 className="font-medium text-sm">{item.title}</h3>
              <p className="text-xs text-gray-600 truncate">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  },
};