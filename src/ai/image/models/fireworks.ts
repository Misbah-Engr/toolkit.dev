import type { ImageModel } from "../types";

const fireworksImageModelsData: Omit<ImageModel, "provider">[] = [
  {
    name: "Playground v2.5 1024",
    modelId: "accounts/fireworks/models/playground-v2-5-1024px-aesthetic",
  },
  {
    name: "Segmind Stable Diffusion 1B",
    modelId: "accounts/fireworks/models/SSD-1B",
  },
  {
    name: "Japanese Stable Diffusion XL",
    modelId: "accounts/fireworks/models/japanese-stable-diffusion-xl",
  },
];

export const fireworksImageModels: ImageModel[] = fireworksImageModelsData.map(
  (model) => ({
    ...model,
    provider: "fireworks",
  }),
);
