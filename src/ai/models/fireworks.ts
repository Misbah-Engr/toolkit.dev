import {
  LanguageModelCapability,
  type ImageModel,
  type LanguageModel,
} from "@/ai/types";

const fireworksLanguageModelData: Omit<LanguageModel, "provider">[] = [
  {
    name: "DeepSeek V3",
    modelId: "accounts/fireworks/models/deepseek-v3",
    description: "Advanced language model with strong reasoning capabilities",
    capabilities: [
      LanguageModelCapability.ToolCalling,
      LanguageModelCapability.Reasoning,
    ],
    bestFor: ["Code generation", "Reasoning", "Complex tasks"],
    contextLength: 128000,
  },
  {
    name: "Llama 3.1 8B",
    modelId: "accounts/fireworks/models/llama-3.1-8b",
    description: "Efficient and fast language model",
    capabilities: [LanguageModelCapability.ToolCalling],
    bestFor: ["Quick responses", "Cost-effective", "Simple tasks"],
    contextLength: 8192,
  },
  {
    name: "Llama 3.1 70B",
    modelId: "accounts/fireworks/models/llama-3.1-70b",
    description: "High-performance language model",
    capabilities: [
      LanguageModelCapability.ToolCalling,
      LanguageModelCapability.Reasoning,
    ],
    bestFor: ["Complex reasoning", "Advanced tasks", "High-quality output"],
    contextLength: 8192,
  },
];

export const fireworksLanguageModels: LanguageModel[] = fireworksLanguageModelData.map(
  (model) => ({
    ...model,
    provider: "fireworks",
  }),
);

const fireworksImageModelData: Omit<ImageModel, "provider">[] = [
  {
    name: "Flux 1",
    modelId: "accounts/fireworks/models/flux-1-dev-fp8",
    description: "High-quality image generation model",
  },
  {
    name: "SDXL 1.0",
    modelId: "accounts/fireworks/models/sdxl-1.0",
    description: "Stable Diffusion XL for detailed image generation",
  },
];

export const fireworksImageModels: ImageModel[] = fireworksImageModelData.map((model) => ({
  ...model,
  provider: "fireworks",
})); 