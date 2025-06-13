import React from "react";

import Image from "next/image";

import type { baseGenerateTool } from "./base";

import type { ClientToolConfig } from "@/mcp/types";

export const generateToolConfigClient: ClientToolConfig<
  typeof baseGenerateTool.inputSchema.shape,
  typeof baseGenerateTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return <span className="opacity/60 text-sm font-light">{args.prompt}</span>;
  },
  ResultComponent: ({ result }) => {
    return (
      <Image src={result.url} alt="Generated Image" width={500} height={500} />
    );
  },
};
