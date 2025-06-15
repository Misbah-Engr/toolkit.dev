import React from "react";
import { BookOpen } from "lucide-react";

import type { baseResearchPaperSearchTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { ToolCallDisplay, ResultsList } from "../../components";

export const exaResearchPaperSearchToolConfigClient: ClientToolConfig<
  typeof baseResearchPaperSearchTool.inputSchema.shape,
  typeof baseResearchPaperSearchTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <ToolCallDisplay
        icon={BookOpen}
        label="Research Paper Search"
        value={args.query}
      />
    );
  },
  ResultComponent: ({ result }) => {
    return (
      <ResultsList
        results={result.results}
        title="Research Papers"
        emptyMessage="No research papers found"
        linkText="Read full paper →"
      />
    );
  },
};
