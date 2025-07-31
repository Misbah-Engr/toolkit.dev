import {
  LanguageModelCapability,
  type LanguageModel,
} from "@/ai/language/types";

const openRouterModelData: Omit<LanguageModel, "provider">[] = [
  {
    name: "Auto",
    modelId: "auto",
    description:
      "Automatically selects the best model for your task using NotDiamond, with access to all model capabilities",
    capabilities: [
      LanguageModelCapability.Vision,
      LanguageModelCapability.ToolCalling,
    ],
    bestFor: [
      "Automatic model selection",
      "Optimal performance",
      "Dynamic routing",
      "Multi-capability tasks",
    ],
    contextLength: 200000, // Using a high value since it can route to models with large context
    isNew: true,
  },
  {
    name: "Horizon Alpha",
    modelId: "horizon-alpha",
    description:
      "A cloaked model provided to the community for feedback. Supports vision and long-context tasks.",
    capabilities: [
      LanguageModelCapability.Vision,
      LanguageModelCapability.ToolCalling,
    ],
    bestFor: [
      "Vision tasks",
      "Long-context processing",
      "General purpose",
      "Community feedback model",
    ],
    contextLength: 256000,
    isNew: true,
  },
];

export const openRouterModels: LanguageModel[] = openRouterModelData.map(
  (model) => ({
    ...model,
    provider: "openrouter", // This matches the icon filename in public/icons/openrouter.png
  }),
);
