import React from "react";
import { Building } from "lucide-react";
import type { baseCompanyResearchTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { HStack, VStack } from "@/components/ui/stack";
import Link from "next/link";

export const exaCompanyResearchToolConfigClient: ClientToolConfig<
  typeof baseCompanyResearchTool.inputSchema.shape,
  typeof baseCompanyResearchTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <HStack className="gap-2">
        <Building className="text-muted-foreground size-4" />
        <VStack className="items-start gap-0">
          <span className="text-muted-foreground/80 text-xs font-medium">
            Company Research
          </span>
          <span className="text-sm">&quot;{args.company}&quot;</span>
        </VStack>
      </HStack>
    );
  },
  ResultComponent: ({ result }) => {
    if (!result.results.length) {
      return <div className="text-gray-500">No company information found</div>;
    }

    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-muted-foreground text-sm font-medium">
          Company Research Results
        </h1>
        <div className="flex flex-col gap-2">
          {result.results.map((item, index) => (
            <div key={index} className="border-l-2 pl-2">
              <h3 className="text-sm font-medium">{item.title}</h3>
              <p className="text-muted-foreground truncate text-xs">
                {item.content}
              </p>
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-xs"
              >
                Read more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
