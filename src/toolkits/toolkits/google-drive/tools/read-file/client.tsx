import React from "react";
import { type readFileTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { HStack, VStack } from "@/components/ui/stack";
import { ToolCallComponent } from "../../components/tool-call";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const googleDriveReadFileToolConfigClient: ClientToolConfig<
  typeof readFileTool.inputSchema.shape,
  typeof readFileTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <ToolCallComponent
        action="Reading File"
        primaryText={`File ID: ${args.fileId}`}
        secondaryText={
          args.exportFormat ? `Export format: ${args.exportFormat}` : undefined
        }
        icon={FileText}
      />
    );
  },
  ResultComponent: ({ result }) => {
    const { content, mimeType, fileName, size, encoding } = result;

    const isTextContent = encoding !== "base64";
    const displayContent = isTextContent
      ? content.length > 1000
        ? content.substring(0, 1000) + "..."
        : content
      : `[Binary content - ${encoding} encoded]`;

    return (
      <VStack className="w-full items-start gap-3">
        <HStack className="w-full items-center justify-between">
          <h3 className="text-sm font-medium">{fileName}</h3>
          <HStack className="gap-2">
            <Badge variant="secondary" className="text-xs">
              {mimeType}
            </Badge>
            {size && (
              <Badge variant="outline" className="text-xs">
                {size > 1024 * 1024
                  ? `${(size / (1024 * 1024)).toFixed(1)} MB`
                  : size > 1024
                    ? `${(size / 1024).toFixed(1)} KB`
                    : `${size} B`}
              </Badge>
            )}
            {encoding && (
              <Badge variant="outline" className="text-xs">
                {encoding}
              </Badge>
            )}
          </HStack>
        </HStack>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="content">
            <AccordionTrigger className="cursor-pointer py-1 hover:no-underline">
              <span className="text-muted-foreground text-xs font-medium">
                File Content
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-0">
              <div className="w-full">
                <pre className="bg-muted overflow-auto rounded p-2 text-xs whitespace-pre-wrap">
                  {displayContent}
                </pre>
                {content.length > 1000 && isTextContent && (
                  <span className="text-muted-foreground mt-1 block text-xs">
                    Content truncated. Full content available for AI processing.
                  </span>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </VStack>
    );
  },
};
