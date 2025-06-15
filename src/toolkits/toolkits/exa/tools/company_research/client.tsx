import React from "react";
import { Building } from "lucide-react";
import type { baseCompanyResearchTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { ToolCallDisplay, ResultsList } from "../../components";

export const exaCompanyResearchToolConfigClient: ClientToolConfig<
  typeof baseCompanyResearchTool.inputSchema.shape,
  typeof baseCompanyResearchTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <ToolCallDisplay
        icon={Building}
        label="Company Research"
        value={args.company}
      />
    );
  },
  ResultComponent: ({ result }) => {
    return (
      <ResultsList
        results={result.results}
        title="Company Research Results"
        emptyMessage="No company information found"
        linkText="Read more →"
      />
    );
  },
};
