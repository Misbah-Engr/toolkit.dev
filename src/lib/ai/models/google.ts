import { ModelCapability, type Model } from "@/lib/ai/types";

const googleModelData: Omit<Model, "provider">[] = [
  {
    name: "Gemini 2.5 Pro Preview",
    modelId: "gemini-2.5-pro-preview-05-06",
    description: "Next-generation Gemini with enhanced reasoning",
    capabilities: [
      ModelCapability.Thinking,
      ModelCapability.Vision,
      ModelCapability.Code,
      ModelCapability.Reasoning,
      ModelCapability.WebSearch,
    ],
    bestFor: ["Complex reasoning", "Advanced analysis", "Research"],
    contextLength: 2000000,
    isNew: true,
  },
  {
    name: "Gemini 2.5 Flash Preview",
    modelId: "gemini-2.5-flash-preview-04-17",
    description: "Fast version of Gemini 2.5 for quick responses",
    capabilities: [
      ModelCapability.Fast,
      ModelCapability.Vision,
      ModelCapability.Code,
      ModelCapability.Reasoning,
      ModelCapability.WebSearch,
    ],
    bestFor: ["Quick tasks", "Real-time responses", "Efficient processing"],
    contextLength: 1000000,
    isNew: true,
  },
  {
    name: "Gemini 2.0 Flash",
    modelId: "gemini-2.0-flash",
    description: "Balanced performance with multimodal capabilities",
    capabilities: [
      ModelCapability.Vision,
      ModelCapability.Code,
      ModelCapability.Reasoning,
      ModelCapability.Audio,
      ModelCapability.WebSearch,
    ],
    bestFor: ["Multimodal tasks", "General purpose", "Balanced performance"],
    contextLength: 1000000,
    isNew: true,
  },
  {
    name: "Gemini 1.5 Pro",
    modelId: "gemini-1.5-pro",
    description: "Powerful model with large context window",
    capabilities: [
      ModelCapability.Vision,
      ModelCapability.Code,
      ModelCapability.Reasoning,
      ModelCapability.WebSearch,
    ],
    bestFor: ["Long documents", "Complex analysis", "Deep reasoning"],
    contextLength: 2000000,
  },
  {
    name: "Gemini 1.5 Flash",
    modelId: "gemini-1.5-flash",
    description: "Fast and efficient for everyday tasks",
    capabilities: [
      ModelCapability.Vision,
      ModelCapability.Code,
      ModelCapability.Fast,
      ModelCapability.WebSearch,
    ],
    bestFor: ["Quick responses", "General chat", "Efficient processing"],
    contextLength: 1000000,
  },
  {
    name: "Gemini 1.5 Flash 8B",
    modelId: "gemini-1.5-flash-8b",
    description: "Compact model optimized for speed",
    capabilities: [ModelCapability.Fast, ModelCapability.WebSearch],
    bestFor: ["Ultra-fast responses", "Simple tasks", "Cost-effective"],
    contextLength: 1000000,
  },
];

export const googleModels: Model[] = googleModelData.map((model) => ({
  ...model,
  provider: "google",
}));
