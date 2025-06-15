import React from "react";
import { Globe } from "lucide-react";
import type { baseWikipediaSearchTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { ToolCallDisplay, ResultsList } from "../../components";

export const exaWikipediaSearchToolConfigClient: ClientToolConfig<
  typeof baseWikipediaSearchTool.inputSchema.shape,
  typeof baseWikipediaSearchTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <ToolCallDisplay
        icon={Globe}
        label="Wikipedia Search"
        value={args.query ?? "..."}
      />
    );
  },
  ResultComponent: ({ result }) => {
    return (
      <ResultsList
        results={result.results}
        title="Wikipedia Articles"
        emptyMessage="No Wikipedia articles found"
        linkText="Read article →"
      />
    );
  },
};
