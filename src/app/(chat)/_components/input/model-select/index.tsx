"use client";

import { useEffect, useState } from "react";

import { api } from "@/trpc/react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ModelProviderIcon } from "@/components/ui/model-icon";
import { Skeleton } from "@/components/ui/skeleton";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Model, ModelCapability } from "@/lib/types";
import { ChevronsUpDown, X, Zap, Eye, Search, Code, Brain, Volume2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  selectedChatModel: Model | undefined;
  setSelectedChatModel: (model: Model) => void;
}

const capabilityIcons: Record<ModelCapability, React.ComponentType<{ className?: string }>> = {
  thinking: Brain,
  vision: Eye,
  "web-search": Search,
  code: Code,
  fast: Zap,
  reasoning: Sparkles,
  audio: Volume2,
};

const capabilityLabels: Record<ModelCapability, string> = {
  thinking: "Thinking",
  vision: "Vision",
  "web-search": "Web Search",
  code: "Code",
  fast: "Fast",
  reasoning: "Reasoning",
  audio: "Audio",
};

export const ModelSelect: React.FC<Props> = ({
  selectedChatModel,
  setSelectedChatModel,
}) => {
  const { data: models, isLoading } = api.models.getModels.useQuery();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const firstModel = models?.[0];

    if (firstModel) {
      setSelectedChatModel(firstModel);
    }
  }, [models, setSelectedChatModel]);

  const formatContextLength = (length?: number) => {
    if (!length) return null;
    if (length >= 1000000) return `${(length / 1000000).toFixed(1)}M tokens`;
    if (length >= 1000) return `${(length / 1000).toFixed(0)}K tokens`;
    return `${length} tokens`;
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-start bg-transparent">
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </>
          ) : selectedChatModel ? (
            <>
              <ModelProviderIcon
                provider={selectedChatModel.provider}
                className="size-4"
              />
              <span className="flex-1 text-left truncate">
                {selectedChatModel.name}
                {selectedChatModel.isNew && (
                  <Badge variant="secondary" className="ml-1.5 text-xs">
                    New
                  </Badge>
                )}
              </span>
              <ChevronsUpDown className="size-4 opacity-50" />
            </>
          ) : (
            <>
              <X className="size-4" />
              Select a model
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-full max-w-xs sm:max-w-md md:w-[400px] max-h-[70vh] overflow-y-auto p-1 mx-2 sm:mx-0"
      >
        {models?.map((model) => (
          <Card
            key={model.modelId}
            className={cn(
              "cursor-pointer transition-colors hover:bg-accent/50 border-0 shadow-none bg-transparent mb-0.5 last:mb-0",
              selectedChatModel?.modelId === model.modelId && "bg-accent"
            )}
            onClick={() => {
              setSelectedChatModel(model);
              setIsOpen(false);
            }}
          >
            <CardContent className="py-1 px-2 sm:py-1.5 sm:px-3">
              <div className="flex items-start gap-2 sm:gap-2 gap-1">
                <ModelProviderIcon 
                  provider={model.provider} 
                  className="size-5 mt-0.5 flex-shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-0.5">
                    <h3 className="font-medium text-sm truncate max-w-[60vw] sm:max-w-none">
                      {model.name}
                    </h3>
                    {model.isNew && (
                      <Badge variant="secondary" className="text-xs h-5">
                        New
                      </Badge>
                    )}
                  </div>
                  
                  {model.description && (
                    <p className="text-xs text-muted-foreground mb-1 line-clamp-2 max-w-full">
                      {model.description}
                    </p>
                  )}
                  
                  {model.capabilities && model.capabilities.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-1">
                      {model.capabilities.map((capability) => {
                        const Icon = capabilityIcons[capability];
                        return (
                          <Badge
                            key={capability}
                            variant="capability"
                            className="text-xs h-5 px-1 gap-1"
                          >
                            {Icon && <Icon className="size-3" />}
                            {capabilityLabels[capability]}
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground gap-0.5 sm:gap-0">
                    {model.bestFor && model.bestFor.length > 0 && (
                      <span className="truncate max-w-full sm:max-w-[60%]">
                        Best for: {model.bestFor.slice(0, 2).join(", ")}
                        {model.bestFor.length > 2 && "..."}
                      </span>
                    )}
                    {model.contextLength && (
                      <span className="flex-shrink-0 sm:ml-2">
                        {formatContextLength(model.contextLength)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
