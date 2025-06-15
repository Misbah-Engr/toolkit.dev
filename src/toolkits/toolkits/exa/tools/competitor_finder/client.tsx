import React from "react";
import { Users } from "lucide-react";
import type { baseCompetitorFinderTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { ToolCallDisplay, ResultsList } from "../../components";

export const exaCompetitorFinderToolConfigClient: ClientToolConfig<
  typeof baseCompetitorFinderTool.inputSchema.shape,
  typeof baseCompetitorFinderTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <ToolCallDisplay
        icon={Users}
        label="Competitor Analysis"
        value={args.company ?? "..."}
      />
    );
  },
  ResultComponent: ({ result }) => {
    return (
      <ResultsList
        results={result.results}
        title="Competitors Found"
        emptyMessage="No competitors found"
        linkText="Learn more →"
      />
    );
  },
};
