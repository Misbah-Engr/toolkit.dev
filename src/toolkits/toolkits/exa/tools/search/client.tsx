import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Markdown } from "@/components/ui/markdown";

import type { baseSearchTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { HStack, VStack } from "@/components/ui/stack";
import { Search } from "lucide-react";
import Link from "next/link";

export const exaSearchToolConfigClient: ClientToolConfig<
  typeof baseSearchTool.inputSchema.shape,
  typeof baseSearchTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <HStack className="gap-2">
        <Search className="text-muted-foreground size-4" />
        <VStack className="items-start gap-0">
          <span className="text-muted-foreground/80 text-xs font-medium">
            Search Query
          </span>
          <span className="text-sm">&quot;{args.query}&quot;</span>
        </VStack>
      </HStack>
    );
  },
  ResultComponent: ({ result }) => {
    if (!result.results.length) {
      return <div className="text-gray-500">No results found</div>;
    }

    return (
      <div className="">
        <h1 className="text-muted-foreground text-sm font-medium">
          Search Results
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
                    <h3 className="group-hover:text-primary line-clamp-2 transition-colors">
                      {result.title}
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      {result.publishedDate
                        ? new Date(result.publishedDate).toLocaleDateString()
                        : "No published date"}
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
                  <DialogDescription>
                    {result.publishedDate
                      ? new Date(result.publishedDate).toLocaleDateString()
                      : "No published date"}
                  </DialogDescription>
                </DialogHeader>
                <div className="w-full overflow-hidden">
                  <Markdown>{result.content}</Markdown>
                </div>
                <DialogFooter>
                  <Link
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:bg-primary/10 rounded-md p-1 transition-colors"
                  >
                    Read full article →
                  </Link>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    );
  },
};
