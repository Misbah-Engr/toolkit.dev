"use client";

import type { LanguageModel } from "@/ai/types";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ModelProviderIcon } from "@/components/ui/model-icon";
import { Badge } from "@/components/ui/badge";
import {
  capabilityIcons,
  capabilityColors,
  formatContextLength,
} from "../utils";

interface MobileModelCardProps {
  model: LanguageModel;
  isSelected: boolean;
  onSelect: () => void;
}

export const MobileModelCard: React.FC<MobileModelCardProps> = ({
  model,
  isSelected,
  onSelect,
}) => {
  return (
    <Card
      className={cn(
        "hover:bg-accent/50 mb-0.5 cursor-pointer border-0 bg-transparent shadow-none transition-colors last:mb-0",
        isSelected && "bg-accent",
      )}
      onClick={onSelect}
    >
      <CardContent className="px-2 py-1 sm:px-3 sm:py-1.5">
        <div className="flex items-center gap-2 sm:gap-2">
          <div className="flex min-w-0 flex-shrink-0 items-center gap-2">
            <ModelProviderIcon
              provider={model.provider}
              className="size-5 flex-shrink-0"
            />
            <h3 className="max-w-[60vw] truncate text-sm font-medium sm:max-w-none">
              {model.name}
            </h3>
            {model.isNew && (
              <Badge variant="secondary" className="h-5 text-xs">
                New
              </Badge>
            )}
          </div>
          <div className="flex flex-1 justify-end gap-1">
            {model.capabilities?.map((capability) => {
              const Icon = capabilityIcons[capability];
              return (
                <Badge
                  key={capability}
                  variant="capability"
                  className={`h-5 gap-1 px-1 text-xs ${capabilityColors[capability]}`}
                >
                  {Icon && <Icon className="size-3" />}
                </Badge>
              );
            })}
          </div>
        </div>
        {model.description && (
          <p className="text-muted-foreground mb-1 line-clamp-2 max-w-full text-xs">
            {model.description}
          </p>
        )}
        <div className="text-muted-foreground flex flex-col gap-0.5 text-xs sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          {model.bestFor && model.bestFor.length > 0 && (
            <span className="max-w-full truncate sm:max-w-[60%]">
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
      </CardContent>
    </Card>
  );
};
