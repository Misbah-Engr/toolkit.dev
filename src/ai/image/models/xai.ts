import type { ImageModel } from "../types";

const xaiImageModelData: Omit<ImageModel, "provider">[] = [
  {
    name: "Grok 2 Image",
    modelId: "grok-2-image",
  },
];

export const xaiImageModels: ImageModel[] = xaiImageModelData.map((model) => ({
  ...model,
  provider: "xai",
}));
