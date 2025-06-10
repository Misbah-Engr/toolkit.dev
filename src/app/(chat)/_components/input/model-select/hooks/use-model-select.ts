"use client";

import { useState, useEffect, useRef } from "react";
import { api } from "@/trpc/react";
import type { Model, ModelCapability, Provider } from "@/lib/ai/types";

interface UseModelSelectProps {
  selectedChatModel: Model | undefined;
  setSelectedChatModel: (model: Model) => void;
}

export const useModelSelect = ({
  selectedChatModel,
  setSelectedChatModel,
}: UseModelSelectProps) => {
  const { data: models, isLoading } = api.models.getModels.useQuery();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredModel, setHoveredModel] = useState<Model | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCapabilities, setSelectedCapabilities] = useState<
    ModelCapability[]
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
    if (firstModel && !selectedChatModel) {
      setSelectedChatModel(firstModel);
    }
  }, [models, setSelectedChatModel, selectedChatModel]);

  const closeInfoDropdown = () => {
    setHoveredModel(null);
    setDropdownPosition(null);
  };

  const handleModelHover = (model: Model, element: HTMLDivElement) => {
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

  const handleModelSelect = (model: Model) => {
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

  const toggleCapability = (capability: ModelCapability) => {
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
