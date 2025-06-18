import { type LanguageModel, LanguageModelCapability } from "@/ai/types";

const llamaModelData: Omit<LanguageModel, "provider">[] = [
  {
    name: "Llama 4 Scout 17B Instruct",
    modelId: "meta-llama/llama-4-scout-17b-16e-instruct",
    description:
      "Llama 4 Scout 17B is an instruction-tuned model designed for following complex instructions",
    capabilities: [
      LanguageModelCapability.ToolCalling,
      LanguageModelCapability.Vision,
    ],
    bestFor: [
      "Instruction following",
      "Task automation",
      "Research assistance",
    ],
    contextLength: 131072,
  },

  {
    name: "Llama 4 Maverick 17B Instruct",
    modelId: "meta-llama/llama-4-maverick-17b-128e-instruct",
    description:
      "Llama 4 Maverick 17B is an experimental instruction-tuned model with enhanced capabilities",
    capabilities: [LanguageModelCapability.ToolCalling],
    bestFor: [
      "Creative tasks",
      "Experimental applications",
      "Advanced reasoning",
    ],
    contextLength: 131072,
  },
  {
    name: "Llama 3.3 70B Versatile",
    modelId: "llama-3.3-70b-versatile",
    description:
      "Llama 3.3 70B is a versatile large language model optimized for various tasks",
    capabilities: [LanguageModelCapability.ToolCalling],
    bestFor: ["General purpose", "Complex reasoning", "Code generation"],
    contextLength: 131072,
  },
  {
    name: "Llama 3.1 8B Instant",
    modelId: "llama-3.1-8b-instant",
    description:
      "Llama 3.1 8B Instant is an optimized model for fast response times",
    capabilities: [LanguageModelCapability.ToolCalling],
    bestFor: [
      "Real-time applications",
      "Quick responses",
      "Efficient processing",
    ],
    contextLength: 131072,
  },
  {
    name: "Llama 3 70B",
    modelId: "llama3-70b-8192",
    description:
      "Llama 3 70B is a large language model with advanced reasoning capabilities",
    capabilities: [LanguageModelCapability.ToolCalling],
    bestFor: ["Complex reasoning", "Research", "Advanced text generation"],
    contextLength: 8192,
  },
  {
    name: "Llama 3 8B",
    modelId: "llama3-8b-8192",
    description:
      "Llama 3 8B is an efficient language model suitable for various text generation tasks",
    capabilities: [LanguageModelCapability.ToolCalling],
    bestFor: ["General purpose", "Quick responses", "Efficient processing"],
    contextLength: 8192,
  },
];

export const llamaModels = llamaModelData.map((model) => ({
  ...model,
  provider: "llama",
}));
