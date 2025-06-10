import { anthropic } from "@ai-sdk/anthropic";

import { ModelCapability, type Model } from "@/lib/types";

const anthropicModelData: Omit<Model, "provider">[] = [
  {
    name: "Claude 4 Opus",
    modelId: "claude-opus-4-20250514",
    description: "Most powerful model for complex reasoning and creative tasks",
    capabilities: [
      ModelCapability.Thinking,
      ModelCapability.Vision,
      ModelCapability.Code,
      ModelCapability.Reasoning,
    ],
    bestFor: ["Complex analysis", "Creative writing", "Research"],
    contextLength: 200000,
    isNew: true,
  },
  {
    name: "Claude Sonnet 4",
    modelId: "claude-sonnet-4-20250514",
    description: "Balanced performance for most tasks with improved reasoning",
    capabilities: [
      ModelCapability.Thinking,
      ModelCapability.Vision,
      ModelCapability.Code,
      ModelCapability.Reasoning,
    ],
    bestFor: ["General purpose", "Code generation", "Analysis"],
    contextLength: 200000,
    isNew: true,
  },
  {
    name: "Claude 3.7 Sonnet",
    modelId: "claude-3-7-sonnet-latest",
    description: "Enhanced version with improved capabilities",
    capabilities: [
      ModelCapability.Vision,
      ModelCapability.Code,
      ModelCapability.Reasoning,
    ],
    bestFor: ["Code review", "Content creation", "Problem solving"],
    contextLength: 200000,
    isNew: true,
  },
  {
    name: "Claude 3.5 Haiku",
    modelId: "claude-3-5-haiku-latest",
    description: "Fastest model for near-instant responsiveness",
    capabilities: [ModelCapability.Fast, ModelCapability.Vision],
    bestFor: ["Quick responses", "Simple queries", "Real-time chat"],
    contextLength: 200000,
  },
  {
    name: "Claude 3.5 Sonnet",
    modelId: "claude-3-5-sonnet-latest",
    description: "Balanced performance and speed for most use cases",
    capabilities: [
      ModelCapability.Vision,
      ModelCapability.Code,
      ModelCapability.Reasoning,
    ],
    bestFor: ["General purpose", "Code assistance", "Writing"],
    contextLength: 200000,
  },
  {
    name: "Claude 3 Opus",
    modelId: "claude-3-opus-latest",
    description: "Most capable model for complex tasks",
    capabilities: [
      ModelCapability.Vision,
      ModelCapability.Code,
      ModelCapability.Reasoning,
    ],
    bestFor: ["Research", "Complex analysis", "Creative projects"],
    contextLength: 200000,
  },
  {
    name: "Claude 3 Sonnet",
    modelId: "claude-3-sonnet-20240229",
    description: "Well-balanced model for everyday tasks",
    capabilities: [ModelCapability.Vision, ModelCapability.Code],
    bestFor: ["General chat", "Code help", "Writing assistance"],
    contextLength: 200000,
  },
  {
    name: "Claude 3 Haiku",
    modelId: "claude-3-haiku-20240307",
    description: "Fast and efficient for simple tasks",
    capabilities: [ModelCapability.Fast],
    bestFor: ["Quick questions", "Simple tasks", "Fast responses"],
    contextLength: 200000,
  },
] as const;

export const anthropicModels: Model[] = anthropicModelData.map((model) => ({
  ...model,
  provider: "anthropic",
}));

export const aaa = anthropicModels.map((model) => anthropic(model.modelId));
