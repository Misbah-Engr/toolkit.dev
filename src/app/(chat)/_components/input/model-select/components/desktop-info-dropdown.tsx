"use client";

import { useEffect, useRef } from "react";
import type { Model } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ModelProviderIcon } from "@/components/ui/model-icon";
import {
  capabilityIcons,
  capabilityLabels,
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
      className="fixed z-[60] bg-popover border rounded-md shadow-lg p-3 w-80 max-h-[300px] overflow-y-auto"
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
            <h3 className="font-medium text-sm">{model.name}</h3>
            {model.isNew && (
              <Badge variant="secondary" className="text-xs h-5">
                New
              </Badge>
            )}
          </div>
        </div>

        {model.description && (
          <p className="text-xs text-muted-foreground">{model.description}</p>
        )}

        {model.capabilities && model.capabilities.length > 0 && (
          <div className="flex flex-wrap gap-1">
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

        <div className="space-y-1 text-xs text-muted-foreground">
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