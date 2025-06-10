"use client";

import type { Model } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ModelProviderIcon } from "@/components/ui/model-icon";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, X } from "lucide-react";

import { useModelSelect } from "./hooks/use-model-select";
import { MobileModelCard } from "./components/mobile-model-card";
import { DesktopModelItem } from "./components/desktop-model-item";
import { ModelInfoDropdown } from "./components/model-info-dropdown";

interface Props {
  selectedChatModel: Model | undefined;
  setSelectedChatModel: (model: Model) => void;
}

export const ModelSelect: React.FC<Props> = ({
  selectedChatModel,
  setSelectedChatModel,
}) => {
  const {
    models,
    isLoading,
    isMobile,
    isOpen,
    setIsOpen,
    hoveredModel,
    dropdownPosition,
    handleModelSelect,
    handleModelHover,
    handleModelLeave,
    closeInfoDropdown,
    onInfoDropdownEnter,
  } = useModelSelect({ selectedChatModel, setSelectedChatModel });

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-start bg-transparent">
            {isLoading && !selectedChatModel ? (
              <>
                <Skeleton className="h-4 w-4 mr-2" />
                <Skeleton className="h-4 w-20" />
              </>
            ) : selectedChatModel ? (
              <>
                <ModelProviderIcon
                  provider={selectedChatModel.provider}
                  className="size-4 mr-2"
                />
                <span className="flex-1 text-left truncate">
                  {selectedChatModel.name}
                  {selectedChatModel.isNew && (
                    <Badge variant="secondary" className="ml-1.5 text-xs h-5">
                      New
                    </Badge>
                  )}
                </span>
                <ChevronsUpDown className="size-4 opacity-50" />
              </>
            ) : (
              <>
                <X className="size-4 mr-2" />
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
              : "w-80",
          )}
        >
          {models?.map((model) =>
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
            ),
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Desktop secondary dropdown */}
      {!isMobile && hoveredModel && dropdownPosition && (
        <ModelInfoDropdown
          model={hoveredModel}
          position={dropdownPosition}
          onClose={closeInfoDropdown}
          onMouseEnter={onInfoDropdownEnter}
        />
      )}
    </>
  );
};
