"use client";

import { useState, useEffect, useRef } from "react";
import { api } from "@/trpc/react";
import type { Model } from "@/lib/types";

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
  const [
    dropdownPosition,
    setDropdownPosition,
  ] = useState<{ top: number; left: number } | null>(null);
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

  return {
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
  };
}; 