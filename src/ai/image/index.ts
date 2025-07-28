import { env } from "@/env";
import { openAiImageModels } from "./models/openai";
import { xaiImageModels } from "./models/xai";

export const allImageModels = [...openAiImageModels, ...xaiImageModels];

export const imageModels = [
  ...("OPENAI_API_KEY" in env ? openAiImageModels : []),
  ...("XAI_API_KEY" in env ? xaiImageModels : []),
];
