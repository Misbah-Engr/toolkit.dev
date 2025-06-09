import type { Model } from "@/lib/types";

const xaiModelData: Omit<Model, "provider">[] = [
  {
    name: "Grok 3",
    modelId: "grok-3",
  },
  {
    name: "Grok 3 Fast",
    modelId: "grok-3-fast",
  },
  {
    name: "Grok 3 Mini",
    modelId: "grok-3-mini",
  },
  {
    name: "Grok 3 Mini Fast",
    modelId: "grok-3-mini-fast",
  },
  {
    name: "Grok 2",
    modelId: "grok-2-1212",
  },
  {
    name: "Grok 2 Vision",
    modelId: "grok-2-vision-1212",
  },
  {
    name: "Grok Beta",
    modelId: "grok-beta",
  },
  {
    name: "Grok Vision Beta",
    modelId: "grok-vision-beta",
  },
];

export const xaiModels: Model[] = xaiModelData.map((model) => ({
  ...model,
  provider: "xai",
}));
