import type { ImageModel } from "../types";

const falImageModelsData: Omit<ImageModel, "provider">[] = [
  {
    name: "Flux Dev",
    modelId: "fal-ai/flux/dev",
  },
  {
    name: "Flux LoRA",
    modelId: "fal-ai/flux-lora",
  },
  {
    name: "Flux Pro v1.1 Ultra",
    modelId: "fal-ai/flux-pro/v1.1-ultra",
  },
  {
    name: "Ideogram v2",
    modelId: "fal-ai/ideogram/v2",
  },
  {
    name: "Recraft v3",
    modelId: "fal-ai/recraft-v3",
  },
  {
    name: "Stable Diffusion 3.5 Large",
    modelId: "fal-ai/stable-diffusion-3.5-large",
  },
  {
    name: "Hyper SDXL",
    modelId: "fal-ai/hyper-sdxl",
  },
  {
    name: "Fast SDXL",
    modelId: "fal-ai/fast-sdxl",
  },
];

export const falImageModels: ImageModel[] = falImageModelsData.map((model) => ({
  ...model,
  provider: "fal",
}));
