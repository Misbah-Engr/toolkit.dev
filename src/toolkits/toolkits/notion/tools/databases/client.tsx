import React from "react";
import type { ClientToolConfig } from "@/toolkits/types";
import type { listDatabasesTool, queryDatabaseTool } from "./base";
import { HStack, VStack } from "@/components/ui/stack";
import { Database, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const notionListDatabasesToolConfigClient: ClientToolConfig<
  typeof listDatabasesTool.inputSchema.shape,
  typeof listDatabasesTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <HStack className="gap-2">
        <Database className="text-muted-foreground size-4" />
        <VStack className="items-start gap-0">
          <span className="text-muted-foreground/80 text-xs font-medium">
            List Databases
          </span>
          {args.page_size && (
            <span className="text-xs">Limit: {args.page_size}</span>
          )}
        </VStack>
      </HStack>
    );
  },
  ResultComponent: ({ result, append }) => {
    if (!result.databases.length) {
      return <div className="text-muted-foreground">No databases found</div>;
    }

    return (
      <div className="">
        <h1 className="text-muted-foreground text-sm font-medium">
          Notion Databases
        </h1>
        <div className="flex flex-col">
          {result.databases.map((db) => (
            <HStack
              key={db.id}
              className="group w-full cursor-pointer items-center border-b py-2 last:border-b-0 last:pb-0"
              onClick={() => {
                void append({
                  role: "user",
                  content: `Query the database "${db.title}" for its content`,
                });
              }}
            >
              <Database className="text-blue-500 size-5 shrink-0" />
              <VStack className="group flex w-full cursor-pointer items-start gap-0">
                <h3 className="group-hover:text-primary line-clamp-2 transition-colors">
                  {db.title}
                </h3>
                {db.description && (
                  <p className="text-muted-foreground text-xs">
                    {db.description}
                  </p>
                )}
                <p className="text-muted-foreground/60 text-xs">
                  Updated {new Date(db.last_edited_time).toLocaleDateString()}
                </p>
              </VStack>
            </HStack>
          ))}
        </div>
        {result.has_more && (
          <p className="text-muted-foreground text-xs mt-2">
            More databases available...
          </p>
        )}
      </div>
    );
  },
};

export const notionQueryDatabaseToolConfigClient: ClientToolConfig<
  typeof queryDatabaseTool.inputSchema.shape,
  typeof queryDatabaseTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <HStack className="gap-2">
        <Search className="text-muted-foreground size-4" />
        <VStack className="items-start gap-0">
          <span className="text-muted-foreground/80 text-xs font-medium">
            Query Database
          </span>
          <span className="text-sm">{args.database_id.slice(0, 8)}...</span>
        </VStack>
      </HStack>
    );
  },
  ResultComponent: ({ result }) => {
    if (!result.results.length) {
      return <div className="text-muted-foreground">No results found</div>;
    }

    return (
      <div className="">
        <h1 className="text-muted-foreground text-sm font-medium">
          Database Query Results
        </h1>
        <div className="flex flex-col">
          {result.results.map((page, index) => (
            <VStack
              key={page.id}
              className="group w-full items-start py-2 last:pb-0"
            >
              <HStack className="items-center gap-2">
                <span className="text-muted-foreground text-xs">#{index + 1}</span>
                <h3 className="line-clamp-1 font-medium transition-colors">
                  {page.id.slice(0, 8)}...
                </h3>
              </HStack>
              <div className="text-muted-foreground/60 text-xs">
                Updated {new Date(page.last_edited_time).toLocaleDateString()}
              </div>
              {Object.keys(page.properties).length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {Object.keys(page.properties).slice(0, 3).map((prop) => (
                    <Badge
                      key={prop}
                      variant="secondary"
                      className="text-xs"
                    >
                      {prop}
                    </Badge>
                  ))}
                  {Object.keys(page.properties).length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{Object.keys(page.properties).length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </VStack>
          ))}
        </div>
        {result.has_more && (
          <p className="text-muted-foreground text-xs mt-2">
            More results available...
          </p>
        )}
      </div>
    );
  },
};