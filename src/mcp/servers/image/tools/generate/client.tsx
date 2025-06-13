import React from "react";

import Image from "next/image";

import type { baseGenerateTool } from "./base";

import type { ClientToolConfig } from "@/mcp/types";
import type z from "zod";

interface ExaSearchCallProps {
  args: z.infer<typeof baseGenerateTool.inputSchema>;
}

const ExaSearchCallingComponent: React.FC<ExaSearchCallProps> = ({ args }) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">Generating image for:</span>
      <span className="font-medium">{args.prompt}</span>
    </div>
  );
};

interface ExaSearchResultsProps {
  result: z.infer<typeof baseGenerateTool.outputSchema>;
}

const ExaSearchResults: React.FC<ExaSearchResultsProps> = ({ result }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Image Generation Results</h1>
      <Image src={result.url} alt="Generated Image" width={500} height={500} />
    </div>
  );
};

export const generateToolConfigClient: ClientToolConfig<
  typeof baseGenerateTool.inputSchema.shape,
  typeof baseGenerateTool.outputSchema.shape
> = {
  CallComponent: ExaSearchCallingComponent,
  ResultComponent: ExaSearchResults,
};
