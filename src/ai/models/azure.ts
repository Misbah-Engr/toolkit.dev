import {
  LanguageModelCapability,
  type ImageModel,
  type LanguageModel,
} from "@/ai/types";

const azureLanguageModelData: Omit<LanguageModel, "provider">[] = [
  {
    name: "GPT-4o",
    modelId: "gpt-4o",
    description: "Most advanced multimodal model with vision and reasoning",
    capabilities: [
      LanguageModelCapability.Vision,
      LanguageModelCapability.Pdf,
      LanguageModelCapability.ToolCalling,
    ],
    bestFor: ["Multimodal tasks", "Vision analysis", "Code generation"],
    contextLength: 128000,
  },
  {
    name: "GPT-4o Mini",
    modelId: "gpt-4o-mini",
    description: "Smaller, faster version of GPT-4o",
    capabilities: [
      LanguageModelCapability.Vision,
      LanguageModelCapability.Pdf,
      LanguageModelCapability.ToolCalling,
    ],
    bestFor: ["Quick tasks", "Cost-effective", "Simple queries"],
    contextLength: 128000,
  },
];

export const azureLanguageModels: LanguageModel[] = azureLanguageModelData.map(
  (model) => ({
    ...model,
    provider: "azure",
  }),
);

const azureImageModelData: Omit<ImageModel, "provider">[] = [
  {
    name: "DALL-E 3",
    modelId: "dall-e-3",
    description: "Advanced image generation model with high quality output",
  },
  {
    name: "DALL-E 2",
    modelId: "dall-e-2",
    description: "Reliable image generation model",
  },
];

export const azureImageModels: ImageModel[] = azureImageModelData.map((model) => ({
  ...model,
  provider: "azure",
})); 