import React from "react";
import { Link } from "lucide-react";
import type { baseCrawlingTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { ToolCallDisplay, ResultsList } from "../../components";

export const exaCrawlingToolConfigClient: ClientToolConfig<
  typeof baseCrawlingTool.inputSchema.shape,
  typeof baseCrawlingTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <ToolCallDisplay
        icon={Link}
        label="Crawling URLs"
        value={args.urls.join(", ")}
      />
    );
  },
  ResultComponent: ({ result }) => {
    return (
      <ResultsList
        results={result.results}
        title="Extracted Content"
        emptyMessage="No content extracted"
        linkText="View source →"
      />
    );
  },
};
