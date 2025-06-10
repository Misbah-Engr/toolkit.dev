"use client";

import {
  Brain,
  Eye,
  Search,
  Code,
  Zap,
  Sparkles,
  Volume2,
  File,
} from "lucide-react";

import { ModelCapability } from "@/lib/ai/types";

export const capabilityIcons: Record<
  ModelCapability,
  React.ComponentType<{ className?: string }>
> = {
  [ModelCapability.Thinking]: Brain,
  [ModelCapability.Vision]: Eye,
  [ModelCapability.WebSearch]: Search,
  [ModelCapability.Code]: Code,
  [ModelCapability.Fast]: Zap,
  [ModelCapability.Reasoning]: Sparkles,
  [ModelCapability.Audio]: Volume2,
  [ModelCapability.Pdf]: File,
};

export const capabilityLabels: Record<ModelCapability, string> = {
  [ModelCapability.Thinking]: "Thinking",
  [ModelCapability.Vision]: "Vision",
  [ModelCapability.WebSearch]: "Web Search",
  [ModelCapability.Code]: "Code",
  [ModelCapability.Fast]: "Fast",
  [ModelCapability.Reasoning]: "Reasoning",
  [ModelCapability.Audio]: "Audio",
  [ModelCapability.Pdf]: "PDF",
};

export const capabilityColors: Record<ModelCapability, string> = {
  [ModelCapability.Thinking]: "bg-blue-100 text-blue-800",
  [ModelCapability.Vision]: "bg-green-100 text-green-800",
  [ModelCapability.WebSearch]: "bg-yellow-100 text-yellow-800",
  [ModelCapability.Code]: "bg-purple-100 text-purple-800",
  [ModelCapability.Fast]: "bg-pink-100 text-pink-800",
  [ModelCapability.Reasoning]: "bg-orange-100 text-orange-800",
  [ModelCapability.Audio]: "bg-cyan-100 text-cyan-800",
  [ModelCapability.Pdf]: "bg-gray-200 text-gray-800",
};

export const formatContextLength = (length?: number) => {
  if (!length) return null;
  if (length >= 1000000) return `${(length / 1000000).toFixed(1)}M tokens`;
  if (length >= 1000) return `${(length / 1000).toFixed(0)}K tokens`;
  return `${length} tokens`;
};
