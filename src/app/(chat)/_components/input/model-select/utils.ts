"use client";

import type { ModelCapability } from "@/lib/types";
import { Brain, Eye, Search, Code, Zap, Sparkles, Volume2 } from "lucide-react";

export const capabilityIcons: Record<
  ModelCapability,
  React.ComponentType<{ className?: string }>
> = {
  thinking: Brain,
  vision: Eye,
  "web-search": Search,
  code: Code,
  fast: Zap,
  reasoning: Sparkles,
  audio: Volume2,
};

export const capabilityLabels: Record<ModelCapability, string> = {
  thinking: "Thinking",
  vision: "Vision",
  "web-search": "Web Search",
  code: "Code",
  fast: "Fast",
  reasoning: "Reasoning",
  audio: "Audio",
};

export const formatContextLength = (length?: number) => {
  if (!length) return null;
  if (length >= 1000000) return `${(length / 1000000).toFixed(1)}M tokens`;
  if (length >= 1000) return `${(length / 1000).toFixed(0)}K tokens`;
  return `${length} tokens`;
}; 