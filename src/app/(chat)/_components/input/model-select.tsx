"use client";

import { useEffect, useState, useRef, forwardRef } from "react";

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

const formatContextLength = (length?: number) => {
  if (!length) return null;
  if (length >= 1000000) return `${(length / 1000000).toFixed(1)}M tokens`;
  if (length >= 1000) return `${(length / 1000).toFixed(0)}K tokens`;
  return `${length} tokens`;
};

// Mobile Model Card Component (existing expanded card logic)
const MobileModelCard: React.FC<{
  model: Model;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ model, isSelected, onSelect }) => {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-colors hover:bg-accent/50 border-0 shadow-none bg-transparent mb-0.5 last:mb-0",
        isSelected && "bg-accent"
      )}
      onClick={onSelect}
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
  );
};

// Desktop Model Item Component (simple list item)
const DesktopModelItem: React.FC<{
  model: Model;
  isSelected: boolean;
  onSelect: () => void;
  onHover: (model: Model, element: HTMLDivElement) => void;
  onLeave: () => void;
}> = ({ model, isSelected, onSelect, onHover, onLeave }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={itemRef}
      className={cn(
        "flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors hover:bg-accent/50 rounded-md",
        isSelected && "bg-accent"
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
      <span className="flex-1 text-sm truncate">
        {model.name}
      </span>
      {model.isNew && (
        <Badge variant="secondary" className="text-xs h-5">
          New
        </Badge>
      )}
    </div>
  );
};

// Desktop Model Info Dropdown Component (secondary dropdown with expanded info)
const ModelInfoDropdown = forwardRef<HTMLDivElement, {
  model: Model;
  position: { top: number; left: number };
  onClose: () => void;
  onMouseEnter: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave: React.MouseEventHandler<HTMLDivElement>;
}>(({ model, position, onClose, onMouseEnter, onMouseLeave }, ref) => {

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const currentRef = ref && typeof ref !== 'function' ? ref.current : null;
      if (currentRef && !currentRef.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, onClose]);

  return (
    <div
      ref={ref}
      className="fixed z-[60] bg-popover border rounded-md shadow-lg p-3 w-80 max-h-[300px] overflow-y-auto"
      style={{
        top: position.top,
        left: position.left,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <ModelProviderIcon 
            provider={model.provider} 
            className="size-5 flex-shrink-0" 
          />
          <div className="flex items-center gap-1">
            <h3 className="font-medium text-sm">
              {model.name}
            </h3>
            {model.isNew && (
              <Badge variant="secondary" className="text-xs h-5">
                New
              </Badge>
            )}
          </div>
        </div>
        
        {model.description && (
          <p className="text-xs text-muted-foreground">
            {model.description}
          </p>
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
              <span className="font-medium">Best for:</span> {model.bestFor.join(", ")}
            </div>
          )}
          {model.contextLength && (
            <div>
              <span className="font-medium">Context:</span> {formatContextLength(model.contextLength)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export const ModelSelect: React.FC<Props> = ({
  selectedChatModel,
  setSelectedChatModel,
}) => {
  const { data: models, isLoading } = api.models.getModels.useQuery();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredModel, setHoveredModel] = useState<Model | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const hideTimeoutIdRef = useRef<number | null>(null);

  // Direct media query check for mobile detection
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
    };

    // Initial check
    checkIfMobile();

    // Add resize listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const firstModel = models?.[0];

    if (firstModel && !selectedChatModel) {
      setSelectedChatModel(firstModel);
    }
  }, [models, setSelectedChatModel, selectedChatModel]);

  const cancelHideTimer = () => {
    if (hideTimeoutIdRef.current) {
      clearTimeout(hideTimeoutIdRef.current);
      hideTimeoutIdRef.current = null;
    }
  };

  const startHideTimer = () => {
    cancelHideTimer();
    hideTimeoutIdRef.current = window.setTimeout(() => {
      setHoveredModel(null);
      setDropdownPosition(null);
    }, 200);
  };

  const handleModelHover = (model: Model, element: HTMLDivElement) => {
    if (isMobile) return;
    
    cancelHideTimer();

    const rect = element.getBoundingClientRect();
    const dropdownRect = element.closest('[data-radix-popper-content-wrapper]')?.getBoundingClientRect();
    
    if (dropdownRect) {
      setDropdownPosition({
        top: rect.top,
        left: dropdownRect.right + 8, // 8px gap between dropdowns
      });
    }
    
    setHoveredModel(model);
  };

  const handleModelLeave = () => {
    if (isMobile) return;
    startHideTimer();
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleModelSelect = (model: Model) => {
    setSelectedChatModel(model);
    setIsOpen(false);
    setHoveredModel(null);
    setDropdownPosition(null);
  };

  return (
    <>
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
          className={cn(
            "max-h-[70vh] overflow-y-auto p-1 mx-2 sm:mx-0",
            isMobile 
              ? "w-full max-w-xs sm:max-w-md md:w-[400px]" 
              : "w-80"
          )}
        >
          {models?.map((model) => (
            isMobile ? (
              <MobileModelCard
                key={model.modelId}
                model={model}
                isSelected={selectedChatModel?.modelId === model.modelId}
                onSelect={() => handleModelSelect(model)}
              />
            ) : (
              <DesktopModelItem
                key={model.modelId}
                model={model}
                isSelected={selectedChatModel?.modelId === model.modelId}
                onSelect={() => handleModelSelect(model)}
                onHover={handleModelHover}
                onLeave={handleModelLeave}
              />
            )
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Desktop secondary dropdown */}
      {!isMobile && hoveredModel && dropdownPosition && (
        <ModelInfoDropdown
          ref={dropdownRef}
          model={hoveredModel}
          position={dropdownPosition}
          onMouseEnter={cancelHideTimer}
          onMouseLeave={startHideTimer}
          onClose={() => {
            setHoveredModel(null);
            setDropdownPosition(null);
          }}
        />
      )}
    </>
  );
};
