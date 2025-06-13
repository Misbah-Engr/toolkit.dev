"use client";

import { useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { ModelProviderIcon } from "@/components/ui/model-icon";

import type { LanguageModel } from "@/ai/types";
import { cn } from "@/lib/utils";

import { capabilityIcons, capabilityColors } from "../utils";

interface DesktopModelItemProps {
  model: LanguageModel;
  isSelected: boolean;
  onSelect: () => void;
  onHover: (model: LanguageModel, element: HTMLDivElement) => void;
  onLeave: () => void;
}

export const DesktopModelItem: React.FC<DesktopModelItemProps> = ({
  model,
  isSelected,
  onSelect,
  onHover,
  onLeave,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={itemRef}
      className={cn(
        "hover:bg-accent/50 flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-colors",
        isSelected && "bg-accent",
      )}
      onClick={onSelect}
      onMouseEnter={() => {
        if (itemRef.current) {
          onHover(model, itemRef.current);
        }
      }}
      onMouseLeave={onLeave}
    >
      {/* Name, provider, new badge stack */}
      <div className="flex min-w-0 flex-shrink-0 items-center gap-2">
        <ModelProviderIcon
          provider={model.provider}
          className="size-4 flex-shrink-0"
        />
        <span className="truncate text-sm font-medium">{model.name}</span>
        {model.isNew && (
          <Badge variant="secondary" className="h-5 text-xs">
            New
          </Badge>
        )}
      </div>
      {/* Capabilities justified to the right */}
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
  );
};
