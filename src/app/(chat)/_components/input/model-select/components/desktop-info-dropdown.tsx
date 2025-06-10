"use client";

import { useEffect, useRef } from "react";
import type { Model } from "@/lib/ai/types";
import { Badge } from "@/components/ui/badge";
import { ModelProviderIcon } from "@/components/ui/model-icon";
import {
  capabilityIcons,
  capabilityLabels,
  capabilityColors,
  formatContextLength,
} from "../utils";

interface ModelInfoDropdownProps {
  model: Model;
  position: { top: number; left: number };
  onClose: () => void;
  onMouseEnter: () => void;
}

export const ModelInfoDropdown: React.FC<ModelInfoDropdownProps> = ({
  model,
  position,
  onClose,
  onMouseEnter,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="bg-popover fixed z-[60] max-h-[300px] w-80 overflow-y-auto rounded-md border p-3 shadow-lg"
      style={{
        top: position.top,
        left: position.left,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onClose}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <ModelProviderIcon
            provider={model.provider}
            className="size-5 flex-shrink-0"
          />
          <div className="flex items-center gap-1">
            <h3 className="text-sm font-medium">{model.name}</h3>
            {model.isNew && (
              <Badge variant="secondary" className="h-5 text-xs">
                New
              </Badge>
            )}
          </div>
        </div>

        {model.description && (
          <p className="text-muted-foreground text-xs">{model.description}</p>
        )}

        {model.capabilities && model.capabilities.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {model.capabilities.map((capability) => {
              const Icon = capabilityIcons[capability];
              return (
                <Badge
                  key={capability}
                  variant="capability"
                  className={`h-5 gap-1 px-1 text-xs ${capabilityColors[capability]}`}
                >
                  {Icon && <Icon className="size-3" />}
                  {capabilityLabels[capability]}
                </Badge>
              );
            })}
          </div>
        )}

        <div className="text-muted-foreground space-y-1 text-xs">
          {model.bestFor && model.bestFor.length > 0 && (
            <div>
              <span className="font-medium">Best for:</span>{" "}
              {model.bestFor.join(", ")}
            </div>
          )}
          {model.contextLength && (
            <div>
              <span className="font-medium">Context:</span>{" "}
              {formatContextLength(model.contextLength)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
