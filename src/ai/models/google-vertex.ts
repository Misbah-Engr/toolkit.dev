import {
  LanguageModelCapability,
  type ImageModel,
  type LanguageModel,
} from "@/ai/types";

const googleVertexLanguageModelData: Omit<LanguageModel, "provider">[] = [
  {
    name: "Gemini 1.5 Flash",
    modelId: "gemini-1.5-flash",
    description: "Fast and efficient multimodal model",
    capabilities: [
      LanguageModelCapability.Vision,
      LanguageModelCapability.ToolCalling,
    ],
    bestFor: ["Quick responses", "Multimodal tasks", "Cost-effective"],
    contextLength: 1000000,
  },
  {
    name: "Gemini 1.5 Pro",
    modelId: "gemini-1.5-pro",
    description: "Advanced multimodal model with long context",
    capabilities: [
      LanguageModelCapability.Vision,
      LanguageModelCapability.ToolCalling,
      LanguageModelCapability.Reasoning,
    ],
    bestFor: ["Complex reasoning", "Long documents", "Advanced analysis"],
    contextLength: 1000000,
  },
];

export const googleVertexLanguageModels: LanguageModel[] = googleVertexLanguageModelData.map(
  (model) => ({
    ...model,
    provider: "vertex",
  }),
);

const googleVertexImageModelData: Omit<ImageModel, "provider">[] = [
  {
    name: "Imagen 2",
    modelId: "imagen-2",
    description: "Google's advanced image generation model",
  },
];

export const googleVertexImageModels: ImageModel[] = googleVertexImageModelData.map((model) => ({
  ...model,
  provider: "vertex",
})); 