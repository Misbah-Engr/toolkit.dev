"use client";

import { useRef } from "react";
import type { Model } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ModelProviderIcon } from "@/components/ui/model-icon";
import { Badge } from "@/components/ui/badge";

interface DesktopModelItemProps {
  model: Model;
  isSelected: boolean;
  onSelect: () => void;
  onHover: (model: Model, element: HTMLDivElement) => void;
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
        "flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors hover:bg-accent/50 rounded-md",
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
      <ModelProviderIcon
        provider={model.provider}
        className="size-4 flex-shrink-0"
      />
      <span className="flex-1 text-sm truncate">{model.name}</span>
      {model.isNew && (
        <Badge variant="secondary" className="text-xs h-5">
          New
        </Badge>
      )}
    </div>
  );
}; 