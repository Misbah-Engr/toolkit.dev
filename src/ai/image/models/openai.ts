import type { ImageModel } from "../types";

const openAiImageModelsData: Omit<ImageModel, "provider">[] = [
  {
    name: "GPT Image",
    modelId: "gpt-image-1",
  },
];

export const openAiImageModels: ImageModel[] = openAiImageModelsData.map(
  (model) => ({
    ...model,
    provider: "openai",
  }),
);
