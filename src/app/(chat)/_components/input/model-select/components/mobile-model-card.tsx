"use client";

import type { Model } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ModelProviderIcon } from "@/components/ui/model-icon";
import { Badge } from "@/components/ui/badge";
import { capabilityIcons, capabilityLabels, formatContextLength } from "../utils";

interface MobileModelCardProps {
  model: Model;
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
        "cursor-pointer transition-colors hover:bg-accent/50 border-0 shadow-none bg-transparent mb-0.5 last:mb-0",
        isSelected && "bg-accent",
      )}
      onClick={onSelect}
    >
      <CardContent className="py-1 px-2 sm:py-1.5 sm:px-3">
        <div className="flex items-start gap-2 sm:gap-2">
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
  );
}; 