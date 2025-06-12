"use client";

import { Eye, Search, Sparkles, File, Wrench } from "lucide-react";

import { ModelCapability } from "@/lib/ai/types";

export const capabilityIcons: Record<
  ModelCapability,
  React.ComponentType<{ className?: string }>
> = {
  [ModelCapability.Vision]: Eye,
  [ModelCapability.WebSearch]: Search,
  [ModelCapability.Reasoning]: Sparkles,
  [ModelCapability.Pdf]: File,
  [ModelCapability.ToolCalling]: Wrench,
};

export const capabilityLabels: Record<ModelCapability, string> = {
  [ModelCapability.Vision]: "Vision",
  [ModelCapability.WebSearch]: "Web Search",
  [ModelCapability.Reasoning]: "Reasoning",
  [ModelCapability.Pdf]: "PDF",
  [ModelCapability.ToolCalling]: "Tool Calling",
};

export const capabilityColors: Record<ModelCapability, string> = {
  [ModelCapability.Vision]: "bg-green-100 text-green-800",
  [ModelCapability.WebSearch]: "bg-yellow-100 text-yellow-800",
  [ModelCapability.Reasoning]: "bg-orange-100 text-orange-800",
  [ModelCapability.Pdf]: "bg-gray-200 text-gray-800",
  [ModelCapability.ToolCalling]: "bg-blue-100 text-blue-800",
};

export const formatContextLength = (length?: number) => {
  if (!length) return null;
  if (length >= 1000000) return `${(length / 1000000).toFixed(1)}M tokens`;
  if (length >= 1000) return `${(length / 1000).toFixed(0)}K tokens`;
  return `${length} tokens`;
};
