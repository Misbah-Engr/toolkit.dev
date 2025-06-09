import type { Model } from "@/lib/types";

const openAiModelData: Omit<Model, "provider">[] = [
  {
    name: "GPT-4o",
    modelId: "gpt-4o",
  },
  {
    name: "GPT-4o Mini",
    modelId: "gpt-4o-mini",
  },
  {
    name: "GPT-4o Audio Preview",
    modelId: "gpt-4o-audio-preview",
  },
  {
    name: "GPT-4o Search Preview",
    modelId: "gpt-4o-search-preview",
  },
  {
    name: "GPT-4 Turbo",
    modelId: "gpt-4-turbo",
  },
  {
    name: "GPT-4 Turbo Preview",
    modelId: "gpt-4-turbo-preview",
  },
  {
    name: "GPT-4",
    modelId: "gpt-4",
  },
  {
    name: "GPT-4.5 Preview",
    modelId: "gpt-4.5-preview",
  },
  {
    name: "GPT-4.1",
    modelId: "gpt-4.1",
  },
  {
    name: "GPT-4.1 Mini",
    modelId: "gpt-4.1-mini",
  },
  {
    name: "GPT-4.1 Nano",
    modelId: "gpt-4.1-nano",
  },
  {
    name: "GPT-3.5 Turbo",
    modelId: "gpt-3.5-turbo",
  },
  {
    name: "O1",
    modelId: "o1",
  },
  {
    name: "O1 Mini",
    modelId: "o1-mini",
  },
  {
    name: "O1 Preview",
    modelId: "o1-preview",
  },
  {
    name: "O3 Mini",
    modelId: "o3-mini",
  },
  {
    name: "O3",
    modelId: "o3",
  },
  {
    name: "O4 Mini",
    modelId: "o4-mini",
  },
];

export const openAiModels: Model[] = openAiModelData.map((model) => ({
  ...model,
  provider: "openai",
}));
