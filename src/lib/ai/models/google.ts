import type { Model } from "@/lib/types";

const googleModelData: Omit<Model, "provider">[] = [
  {
    name: "Gemini 2.5 Pro Preview",
    modelId: "gemini-2.5-pro-preview-05-06",
  },
  {
    name: "Gemini 2.5 Flash Preview",
    modelId: "gemini-2.5-flash-preview-04-17",
  },
  {
    name: "Gemini 2.0 Flash",
    modelId: "gemini-2.0-flash",
  },
  {
    name: "Gemini 1.5 Pro",
    modelId: "gemini-1.5-pro",
  },
  {
    name: "Gemini 1.5 Flash",
    modelId: "gemini-1.5-flash",
  },
  {
    name: "Gemini 1.5 Flash 8B",
    modelId: "gemini-1.5-flash-8b",
  },
];

export const googleModels: Model[] = googleModelData.map((model) => ({
  ...model,
  provider: "google",
}));
