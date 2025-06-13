"use client";

import { Badge } from "@/components/ui/badge";
import { ModelProviderIcon } from "@/components/ui/model-icon";

import type { LanguageModel } from "@/ai/types";
import { cn } from "@/lib/utils";

import { capabilityIcons, capabilityColors } from "../utils";

interface FeaturedModelCardProps {
  model: LanguageModel;
  isSelected: boolean;
  onSelect: () => void;
}

export const FeaturedModelCard: React.FC<FeaturedModelCardProps> = ({
  model,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={cn(
        "hover:bg-accent/50 flex cursor-pointer flex-col gap-2 rounded-lg border p-3 transition-colors",
        isSelected && "bg-accent border-primary",
      )}
      onClick={onSelect}
    >
      {/* Header with provider icon and name */}
      <div className="flex items-center gap-2">
        <ModelProviderIcon
          provider={model.provider}
          className="size-5 flex-shrink-0"
        />
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="truncate text-sm font-semibold">{model.name}</span>
          {model.isNew && (
            <Badge variant="secondary" className="h-5 text-xs">
              New
            </Badge>
          )}
        </div>
      </div>

      {/* Description */}
      {model.description && (
        <p className="text-muted-foreground line-clamp-2 text-xs">
          {model.description}
        </p>
      )}

      {/* Capabilities */}
      {model.capabilities && model.capabilities.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {model.capabilities.map((capability) => {
            const Icon = capabilityIcons[capability];
            return (
              <Badge
                key={capability}
                variant="capability"
                className={`h-5 gap-1 p-1 text-xs ${capabilityColors[capability]}`}
              >
                {Icon && <Icon className="size-3" />}
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};
