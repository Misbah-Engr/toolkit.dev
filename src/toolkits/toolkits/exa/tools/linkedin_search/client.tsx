import React from "react";
import { Linkedin } from "lucide-react";
import type { baseLinkedinSearchTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { ToolCallDisplay, ResultsList } from "../../components";

export const exaLinkedinSearchToolConfigClient: ClientToolConfig<
  typeof baseLinkedinSearchTool.inputSchema.shape,
  typeof baseLinkedinSearchTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <ToolCallDisplay
        icon={Linkedin}
        label="LinkedIn Search"
        value={args.query ?? "..."}
      />
    );
  },
  ResultComponent: ({ result }) => {
    return (
      <ResultsList
        results={result.results}
        title="LinkedIn Results"
        emptyMessage="No LinkedIn profiles found"
        linkText="View profile →"
      />
    );
  },
};
