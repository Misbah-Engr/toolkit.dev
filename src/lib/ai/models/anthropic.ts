import type { Model } from "@/lib/types";

const anthropicModelData: Omit<Model, "provider">[] = [
  {
    name: "Claude 4 Opus",
    modelId: "claude-opus-4-20250514",
  },
  {
    name: "Claude Sonnet 4",
    modelId: "claude-sonnet-4-20250514",
  },
  {
    name: "Claude 3.7 Sonnet",
    modelId: "claude-3-7-sonnet-latest",
  },
  {
    name: "Claude 3.5 Haiku",
    modelId: "claude-3-5-haiku-latest",
  },
  {
    name: "Claude 3.5 Sonnet",
    modelId: "claude-3-5-sonnet-latest",
  },
  {
    name: "Claude 3 Opus",
    modelId: "claude-3-opus-latest",
  },
  {
    name: "Claude 3 Sonnet",
    modelId: "claude-3-sonnet-20240229",
  },
  {
    name: "Claude 3 Haiku",
    modelId: "claude-3-haiku-20240307",
  },
];

export const anthropicModels: Model[] = anthropicModelData.map((model) => ({
  ...model,
  provider: "anthropic",
}));
