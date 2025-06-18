import { env } from "@/env";

import { type LanguageModel } from "@/ai/types";

import { anthropicModels } from "./anthropic";
import { googleModels } from "./google";
import { openAiLanguageModels, openAiImageModels } from "./openai";
import { xaiImageModels, xaiLanguageModels } from "./xai";
import { perplexityModels } from "./perplexity";
import { llamaModels } from "./llama";
import { qwenModels } from "./qwen";
import { deepseekModels } from "./deepseek";

export const languageModels: LanguageModel[] = [
  ...anthropicModels,
  ...googleModels,
  ...openAiLanguageModels,
  ...xaiLanguageModels,
  ...perplexityModels,
  ...llamaModels,
  ...qwenModels,
  ...deepseekModels,
];

export const imageModels = [
  ...("OPENAI_API_KEY" in env ? openAiImageModels : []),
  ...("XAI_API_KEY" in env ? xaiImageModels : []),
];
