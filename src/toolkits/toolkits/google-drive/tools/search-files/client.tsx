import React from "react";
import { type searchFilesTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { HStack, VStack } from "@/components/ui/stack";
import { FileCard } from "../../components/file-card";
import { ToolCallComponent } from "../../components/tool-call";
import { Search } from "lucide-react";

export const googleDriveSearchFilesToolConfigClient: ClientToolConfig<
  typeof searchFilesTool.inputSchema.shape,
  typeof searchFilesTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <ToolCallComponent
        action="Searching Files"
        primaryText={`"${args.query}" (${args.pageSize ?? 10} files)`}
        secondaryText={
          args.mimeType ? `MIME type: ${args.mimeType}` : "All file types"
        }
        icon={Search}
      />
    );
  },
  ResultComponent: ({ result }) => {
    const { files, nextPageToken, incompleteSearch } = result;

    if (files.length === 0) {
      return (
        <p className="text-muted-foreground text-sm">
          No files found matching your search
        </p>
      );
    }

    return (
      <VStack className="items-start gap-2">
        <HStack className="items-center justify-between">
          <h3 className="text-sm font-medium">
            Search Results ({files.length})
          </h3>
          {incompleteSearch && (
            <span className="text-muted-foreground text-xs">
              Incomplete search - results may be limited
            </span>
          )}
        </HStack>

        <div className="flex w-full flex-col gap-2">
          {files.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>

        {nextPageToken && (
          <span className="text-muted-foreground text-xs">
            More results available
          </span>
        )}
      </VStack>
    );
  },
};
