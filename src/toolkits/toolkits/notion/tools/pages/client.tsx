import React from "react";
import type { ClientToolConfig } from "@/toolkits/types";
import type { getPageTool, searchPagesTool } from "./base";
import { HStack, VStack } from "@/components/ui/stack";
import { FileText, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const notionGetPageToolConfigClient: ClientToolConfig<
  typeof getPageTool.inputSchema.shape,
  typeof getPageTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <HStack className="gap-2">
        <FileText className="text-muted-foreground size-4" />
        <VStack className="items-start gap-0">
          <span className="text-muted-foreground/80 text-xs font-medium">
            Get Page
          </span>
          <span className="text-sm">{args.page_id.slice(0, 8)}...</span>
        </VStack>
      </HStack>
    );
  },
  ResultComponent: ({ result, append }) => {
    return (
      <div className="">
        <h1 className="text-muted-foreground text-sm font-medium">
          Page Details
        </h1>
        <VStack className="w-full items-start gap-2">
          <HStack className="items-center gap-2">
            <FileText className="text-blue-500 size-5 shrink-0" />
            <VStack className="items-start gap-0">
              <h3 className="font-medium">
                {result.id.slice(0, 8)}...
              </h3>
              <p className="text-muted-foreground/60 text-xs">
                Created {new Date(result.created_time).toLocaleDateString()}
              </p>
              <p className="text-muted-foreground/60 text-xs">
                Updated {new Date(result.last_edited_time).toLocaleDateString()}
              </p>
            </VStack>
          </HStack>
          
          {result.archived && (
            <Badge variant="secondary" className="text-xs">
              Archived
            </Badge>
          )}
          
          {Object.keys(result.properties).length > 0 && (
            <div className="w-full">
              <p className="text-muted-foreground text-xs font-medium mb-1">
                Properties
              </p>
              <div className="flex flex-wrap gap-1">
                {Object.keys(result.properties).slice(0, 5).map((prop) => (
                  <Badge
                    key={prop}
                    variant="outline"
                    className="text-xs"
                  >
                    {prop}
                  </Badge>
                ))}
                {Object.keys(result.properties).length > 5 && (
                  <Badge variant="secondary" className="text-xs">
                    +{Object.keys(result.properties).length - 5}
                  </Badge>
                )}
              </div>
            </div>
          )}
          
          <HStack
            className="cursor-pointer text-blue-600 hover:text-blue-800 text-xs"
            onClick={() => {
              void append({
                role: "user",
                content: `Get the blocks/content of page ${result.id}`,
              });
            }}
          >
            <span>View page content →</span>
          </HStack>
        </VStack>
      </div>
    );
  },
};

export const notionSearchPagesToolConfigClient: ClientToolConfig<
  typeof searchPagesTool.inputSchema.shape,
  typeof searchPagesTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <HStack className="gap-2">
        <Search className="text-muted-foreground size-4" />
        <VStack className="items-start gap-0">
          <span className="text-muted-foreground/80 text-xs font-medium">
            Search Pages
          </span>
          <span className="text-sm">&quot;{args.query}&quot;</span>
        </VStack>
      </HStack>
    );
  },
  ResultComponent: ({ result, append }) => {
    if (!result.results.length) {
      return <div className="text-muted-foreground">No pages found</div>;
    }

    return (
      <div className="">
        <h1 className="text-muted-foreground text-sm font-medium">
          Page Search Results
        </h1>
        <div className="flex flex-col">
          {result.results.map((page, index) => (
            <HStack
              key={page.id}
              className="group w-full cursor-pointer items-center border-b py-2 last:border-b-0 last:pb-0"
              onClick={() => {
                void append({
                  role: "user",
                  content: `Get the content of page ${page.id}`,
                });
              }}
            >
              <FileText className="text-blue-500 size-5 shrink-0" />
              <VStack className="group flex w-full cursor-pointer items-start gap-0">
                <HStack className="items-center gap-2">
                  <h3 className="group-hover:text-primary line-clamp-2 transition-colors">
                    Page #{index + 1}
                  </h3>
                  {page.archived && (
                    <Badge variant="secondary" className="text-xs">
                      Archived
                    </Badge>
                  )}
                </HStack>
                <p className="text-muted-foreground/60 text-xs">
                  Updated {new Date(page.last_edited_time).toLocaleDateString()}
                </p>
                {Object.keys(page.properties).length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {Object.keys(page.properties).slice(0, 3).map((prop) => (
                      <Badge
                        key={prop}
                        variant="outline"
                        className="text-xs"
                      >
                        {prop}
                      </Badge>
                    ))}
                    {Object.keys(page.properties).length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{Object.keys(page.properties).length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </VStack>
            </HStack>
          ))}
        </div>
        {result.has_more && (
          <p className="text-muted-foreground text-xs mt-2">
            More pages available...
          </p>
        )}
      </div>
    );
  },
};