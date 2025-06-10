"use client";

import { ChevronsUpDown, X, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ModelProviderIcon } from "@/components/ui/model-icon";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MobileModelCard } from "./components/mobile-model-card";
import { DesktopModelItem } from "./components/desktop-model-item";
import { ModelInfoDropdown } from "./components/desktop-info-dropdown";
import { capabilityIcons, capabilityLabels } from "./utils";
import { ModelCapability } from "@/lib/ai/types";

import { useModelSelect } from "./hooks/use-model-select";

import { useChatContext } from "../../../_contexts/chat-context";

export const ModelSelect: React.FC = () => {
  const { selectedChatModel, setSelectedChatModel } = useChatContext();

  const {
    models,
    isLoading,
    isMobile,
    isOpen,
    setIsOpen,
    hoveredModel,
    dropdownPosition,
    searchQuery,
    setSearchQuery,
    selectedCapabilities,
    selectedProviders,
    toggleCapability,
    toggleProvider,
    handleModelSelect,
    handleModelHover,
    handleModelLeave,
    closeInfoDropdown,
    onInfoDropdownEnter,
  } = useModelSelect({ selectedChatModel, setSelectedChatModel });

  if (!models) {
    return null;
  }

  // Get unique providers from models
  const availableProviders = Array.from(
    new Set(models.map((model) => model.provider)),
  );

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-start bg-transparent">
            {isLoading && !selectedChatModel ? (
              <>
                <Skeleton className="mr-2 h-4 w-4" />
                <Skeleton className="h-4 w-20" />
              </>
            ) : selectedChatModel ? (
              <>
                <ModelProviderIcon
                  provider={selectedChatModel.provider}
                  className="mr-2 size-4"
                />
                <span className="flex-1 truncate text-left">
                  {selectedChatModel.name}
                  {selectedChatModel.isNew && (
                    <Badge variant="secondary" className="ml-1.5 h-5 text-xs">
                      New
                    </Badge>
                  )}
                </span>
                <ChevronsUpDown className="size-4 opacity-50" />
              </>
            ) : (
              <>
                <X className="mr-2 size-4" />
                Select a model
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-lg p-0" align="start" sideOffset={8}>
          <div className="bg-background sticky top-0 z-10 border-b p-2">
            <div className="relative mb-2">
              <Search className="text-muted-foreground absolute top-2.5 left-2 size-4" />
              <Input
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {availableProviders.map((provider) => (
                  <Badge
                    key={provider}
                    variant={
                      selectedProviders.includes(provider)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer gap-1 px-1.5 py-0.5"
                    onClick={() => toggleProvider(provider)}
                  >
                    <ModelProviderIcon provider={provider} className="size-3" />
                    {provider}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                {Object.values(ModelCapability).map((capability) => {
                  const Icon = capabilityIcons[capability];
                  return (
                    <Badge
                      key={capability}
                      variant={
                        selectedCapabilities.includes(capability)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer gap-1 px-1.5 py-0.5"
                      onClick={() => toggleCapability(capability)}
                    >
                      {Icon && <Icon className="size-3" />}
                      {capabilityLabels[capability]}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {isMobile ? (
              <div className="flex flex-col gap-2 p-2">
                {models.map((model) => (
                  <MobileModelCard
                    key={model.modelId}
                    model={model}
                    isSelected={selectedChatModel?.modelId === model.modelId}
                    onSelect={() => handleModelSelect(model)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-1 p-1">
                {models.map((model) => (
                  <DesktopModelItem
                    key={model.modelId}
                    model={model}
                    isSelected={selectedChatModel?.modelId === model.modelId}
                    onSelect={() => handleModelSelect(model)}
                    onHover={handleModelHover}
                    onLeave={handleModelLeave}
                  />
                ))}
              </div>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

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
