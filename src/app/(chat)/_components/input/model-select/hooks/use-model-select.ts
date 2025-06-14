"use client";

import { useState, useEffect, useRef } from "react";
import { api } from "@/trpc/react";
import type {
  LanguageModel,
  LanguageModelCapability,
  Provider,
} from "@/ai/types";

interface UseModelSelectProps {
  selectedChatModel: LanguageModel | undefined;
  setSelectedChatModel: (model: LanguageModel) => void;
}

export const useModelSelect = ({
  selectedChatModel,
  setSelectedChatModel,
}: UseModelSelectProps) => {
  const { data: models, isLoading } = api.models.getLanguageModels.useQuery(
    undefined,
    {
      select: (data) => {
        const providers = Array.from(
          new Set(data.map((model) => model.provider)),
        );
        const modelsByProvider = providers.reduce(
          (acc, provider) => {
            acc[provider] = data.filter((model) => model.provider === provider);
            return acc;
          },
          {} as Record<string, typeof data>,
        );

        const result: typeof data = [];
        let index = 0;
        while (result.length < data.length) {
          for (const provider of providers) {
            const providerModels = modelsByProvider[provider];
            const model = providerModels?.[index];
            if (model) {
              result.push(model);
            }
          }
          index++;
        }
        return result;
      },
    },
  );
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredModel, setHoveredModel] = useState<LanguageModel | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCapabilities, setSelectedCapabilities] = useState<
    LanguageModelCapability[]
  >([]);
  const [selectedProviders, setSelectedProviders] = useState<Provider[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const firstModel = models?.[0];

    if (selectedChatModel && models) {
      // If there's a selected model, validate it still exists in available models
      const modelStillExists = models.some(
        (model) =>
          model.modelId === selectedChatModel.modelId &&
          model.provider === selectedChatModel.provider,
      );

      // If the persisted model no longer exists, fall back to the first available model
      if (!modelStillExists && firstModel) {
        setSelectedChatModel(firstModel);
      }
    } else if (firstModel && !selectedChatModel) {
      // Only auto-select the first model if no model is currently selected
      setSelectedChatModel(firstModel);
    }
  }, [models, setSelectedChatModel, selectedChatModel]);

  const closeInfoDropdown = () => {
    setHoveredModel(null);
    setDropdownPosition(null);
  };

  const handleModelHover = (model: LanguageModel, element: HTMLDivElement) => {
    if (isMobile) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const rect = element.getBoundingClientRect();
    const dropdownRect = element
      .closest("[data-radix-popper-content-wrapper]")
      ?.getBoundingClientRect();

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
    // Small delay to allow moving to secondary dropdown
    timerRef.current = setTimeout(() => {
      closeInfoDropdown();
    }, 200);
  };

  const onInfoDropdownEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleModelSelect = (model: LanguageModel) => {
    setSelectedChatModel(model);
    setIsOpen(false);
    closeInfoDropdown();
  };

  const filteredModels = models?.filter((model) => {
    const matchesSearch =
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCapabilities =
      selectedCapabilities.length === 0 ||
      selectedCapabilities.every((capability) =>
        model.capabilities?.includes(capability),
      );

    const matchesProviders =
      selectedProviders.length === 0 ||
      selectedProviders.includes(model.provider);

    return matchesSearch && matchesCapabilities && matchesProviders;
  });

  const toggleCapability = (capability: LanguageModelCapability) => {
    setSelectedCapabilities((prev) =>
      prev.includes(capability)
        ? prev.filter((c) => c !== capability)
        : [...prev, capability],
    );
  };

  const toggleProvider = (provider: Provider) => {
    setSelectedProviders((prev) =>
      prev.includes(provider)
        ? prev.filter((p) => p !== provider)
        : [...prev, provider],
    );
  };

  return {
    models: filteredModels,
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
  };
};
