import { ModelCapability, type Model } from "@/lib/ai/types";

const perplexityModelData: Omit<Model, "provider">[] = [
  {
    name: "Sonar Pro",
    modelId: "sonar-pro",
    description: "Next-generation Sonar with enhanced reasoning",
    capabilities: [ModelCapability.WebSearch],
    bestFor: ["Complex reasoning", "Advanced analysis", "Research"],
    contextLength: 2000000,
    isNew: true,
  },
  {
    name: "Sonar",
    modelId: "sonar",
    description: "Fast version of Sonar for quick responses",
    capabilities: [ModelCapability.Fast, ModelCapability.WebSearch],
    bestFor: ["Quick tasks", "Real-time responses", "Efficient processing"],
    contextLength: 1000000,
    isNew: true,
  },
];

export const perplexityModels: Model[] = perplexityModelData.map((model) => ({
  ...model,
  provider: "perplexity",
}));
