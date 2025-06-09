import type { Model } from "@/lib/types";

const xaiModelData: Omit<Model, "provider">[] = [
  {
    name: "Grok 3",
    modelId: "grok-3",
    description: "Latest generation Grok model with enhanced capabilities",
    capabilities: ["vision", "code", "reasoning"],
    bestFor: ["General purpose", "Real-time information", "Analysis"],
    contextLength: 128000,
    isNew: true,
  },
  {
    name: "Grok 3 Fast",
    modelId: "grok-3-fast",
    description: "Optimized for speed and efficiency",
    capabilities: ["fast", "code"],
    bestFor: ["Quick responses", "Real-time chat", "Simple tasks"],
    contextLength: 128000,
    isNew: true,
  },
  {
    name: "Grok 3 Mini",
    modelId: "grok-3-mini",
    description: "Compact version for efficient processing",
    capabilities: ["fast"],
    bestFor: ["Cost-effective", "Simple queries", "Quick tasks"],
    contextLength: 128000,
    isNew: true,
  },
  {
    name: "Grok 3 Mini Fast",
    modelId: "grok-3-mini-fast",
    description: "Ultra-fast compact model",
    capabilities: ["fast"],
    bestFor: ["Ultra-quick responses", "Simple chat", "Basic tasks"],
    contextLength: 128000,
    isNew: true,
  },
  {
    name: "Grok 2",
    modelId: "grok-2-1212",
    description: "Advanced conversational AI with real-time knowledge",
    capabilities: ["code", "reasoning"],
    bestFor: ["Conversations", "Real-time info", "General purpose"],
    contextLength: 128000,
  },
  {
    name: "Grok 2 Vision",
    modelId: "grok-2-vision-1212",
    description: "Grok 2 with image understanding capabilities",
    capabilities: ["vision", "code", "reasoning"],
    bestFor: ["Image analysis", "Multimodal tasks", "Visual content"],
    contextLength: 128000,
  },
  {
    name: "Grok Beta",
    modelId: "grok-beta",
    description: "Beta version with experimental features",
    capabilities: ["code", "reasoning"],
    bestFor: ["Testing", "Experimental", "Early access"],
    contextLength: 128000,
  },
  {
    name: "Grok Vision Beta",
    modelId: "grok-vision-beta",
    description: "Beta version with vision capabilities",
    capabilities: ["vision", "code"],
    bestFor: ["Image testing", "Vision experiments", "Beta features"],
    contextLength: 128000,
  },
];

export const xaiModels: Model[] = xaiModelData.map((model) => ({
  ...model,
  provider: "xai",
}));
