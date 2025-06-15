import React from "react";
import { Github } from "lucide-react";
import type { baseGithubSearchTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { ToolCallDisplay, ResultsList } from "../../components";

export const exaGithubSearchToolConfigClient: ClientToolConfig<
  typeof baseGithubSearchTool.inputSchema.shape,
  typeof baseGithubSearchTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <ToolCallDisplay icon={Github} label="GitHub Search" value={args.query} />
    );
  },
  ResultComponent: ({ result }) => {
    return (
      <ResultsList
        results={result.results}
        title="GitHub Repositories"
        emptyMessage="No GitHub repositories found"
        linkText="View repository →"
      />
    );
  },
};
