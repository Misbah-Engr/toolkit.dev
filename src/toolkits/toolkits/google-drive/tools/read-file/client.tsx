import React from "react";
import { type readFileTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { HStack, VStack } from "@/components/ui/stack";
import { ToolCallComponent } from "../../components/tool-call";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const googleDriveReadFileToolConfigClient: ClientToolConfig<
  typeof readFileTool.inputSchema.shape,
  typeof readFileTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <ToolCallComponent
        action="Reading File"
        primaryText={`File ID: ${args.fileId}`}
        secondaryText={args.exportFormat ? `Export format: ${args.exportFormat}` : undefined}
        icon={FileText}
      />
    );
  },
  ResultComponent: ({ result }) => {
    const { content, mimeType, fileName, size, encoding } = result;
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy content:', err);
      }
    };

    const isTextContent = encoding !== 'base64';
    const displayContent = isTextContent 
      ? content.length > 1000 
        ? content.substring(0, 1000) + '...' 
        : content
      : `[Binary content - ${encoding} encoded]`;

    return (
      <VStack className="items-start gap-3 w-full">
        <HStack className="items-center justify-between w-full">
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

        <Card className="w-full">
          <CardContent className="p-3">
            <VStack className="items-start gap-2">
              <HStack className="items-center justify-between w-full">
                <span className="text-muted-foreground text-xs font-medium">
                  File Content
                </span>
                {isTextContent && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-6 px-2"
                  >
                    {copied ? (
                      <Check className="size-3" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                  </Button>
                )}
              </HStack>
              <div className="w-full">
                <pre className="text-xs bg-muted rounded p-2 overflow-auto max-h-96 whitespace-pre-wrap">
                  {displayContent}
                </pre>
                {content.length > 1000 && isTextContent && (
                  <span className="text-muted-foreground text-xs mt-1 block">
                    Content truncated. Full content available for AI processing.
                  </span>
                )}
              </div>
            </VStack>
          </CardContent>
        </Card>
      </VStack>
    );
  },
};