import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Markdown } from "@/components/ui/markdown";

import type { baseResearchPaperSearchTool } from "./base";
import type { ClientToolConfig } from "@/mcp/types";
import { HStack, VStack } from "@/components/ui/stack";
import { BookOpen } from "lucide-react";

export const exaResearchPaperSearchToolConfigClient: ClientToolConfig<
  typeof baseResearchPaperSearchTool.inputSchema.shape,
  typeof baseResearchPaperSearchTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <HStack className="gap-2">
        <BookOpen className="text-muted-foreground size-4" />
        <VStack className="items-start gap-0">
          <span className="text-muted-foreground/80 text-xs font-medium">
            Research Paper Search
          </span>
          <span className="text-sm">&quot;{args.query}&quot;</span>
        </VStack>
      </HStack>
    );
  },
  ResultComponent: ({ result }) => {
    if (!result.results.length) {
      return <div className="text-gray-500">No research papers found</div>;
    }

    return (
      <div className="">
        <h1 className="text-muted-foreground text-sm font-medium">
          Research Papers
        </h1>
        <div className="flex flex-col">
          {result.results.map((result, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <HStack className="group w-full cursor-pointer items-center border-b py-2 last:border-b-0 last:pb-0">
                  <div className="mt-1 size-4 shrink-0 overflow-hidden rounded-sm">
                    {result.favicon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={result.favicon}
                        alt="Favicon"
                        className="size-full"
                      />
                    ) : (
                      <div className="bg-muted size-full rounded-full" />
                    )}
                  </div>
                  <VStack className="group flex w-full cursor-pointer items-start gap-0">
                    <h3 className="line-clamp-2 transition-colors group-hover:text-blue-600">
                      {result.title}
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      {result.publishedDate
                        ? new Date(result.publishedDate).toLocaleDateString()
                        : "No published date"} • {result.author || "Unknown author"}
                    </p>
                  </VStack>
                  {result.image && (
                    <div className="max-w-20 shrink-0 overflow-hidden rounded-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={result.image}
                        alt="Image"
                        className="size-full object-cover"
                      />
                    </div>
                  )}
                </HStack>
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
                    {result.author && <> • Author: {result.author}</>}
                  </div>
                  <Markdown>{result.content}</Markdown>
                  <div className="pt-4">
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Read full paper →
                    </a>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    );
  },
};