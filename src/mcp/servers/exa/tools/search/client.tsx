import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Markdown from "react-markdown";
import type {
  baseSearchTool,
  ExaSearchToolArgs,
  ExaSearchToolResult,
} from "./base";
import type { ClientToolConfig } from "@/mcp/types";

interface ExaSearchCallProps {
  args: ExaSearchToolArgs;
}

const ExaSearchCallingComponent: React.FC<ExaSearchCallProps> = ({ args }) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">Searching for:</span>
      <span className="font-medium">{args.query}</span>
    </div>
  );
};

interface ExaSearchResultsProps {
  result: ExaSearchToolResult;
}

const ExaSearchResults: React.FC<ExaSearchResultsProps> = ({ result }) => {
  if (!result.results.length) {
    return <div className="text-gray-500">No results found</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Exa Search Results</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {result.results.map((result, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div className="group flex cursor-pointer flex-col items-start justify-between rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-300 hover:shadow-md">
                <h3 className="line-clamp-2 text-lg font-semibold transition-colors group-hover:text-blue-600">
                  {result.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {result.publishedDate
                    ? new Date(result.publishedDate).toLocaleDateString()
                    : "No published date"}
                </p>
              </div>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] max-w-3xl overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{result.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div className="text-sm text-gray-500">
                  Published:{" "}
                  {result.publishedDate
                    ? new Date(result.publishedDate).toLocaleDateString()
                    : "No published date"}
                </div>
                <Markdown>{result.content}</Markdown>
                <div className="pt-4">
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Read full article →
                  </a>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export const exaSearchToolConfigClient: ClientToolConfig<
  typeof baseSearchTool.inputSchema.shape,
  typeof baseSearchTool.outputSchema.shape
> = {
  CallComponent: ExaSearchCallingComponent,
  ResultComponent: ExaSearchResults,
};
