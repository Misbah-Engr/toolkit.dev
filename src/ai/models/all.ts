// for type inference

import { openAiImageModels, openAiLanguageModels } from "./openai";
import { xaiImageModels, xaiLanguageModels } from "./xai";
import { perplexityModels } from "./perplexity";
import { googleModels } from "./google";
import { anthropicModels } from "./anthropic";
import { llamaModels } from "./llama";
import { qwenModels } from "./qwen";
import { deepseekModels } from "./deepseek";

export const allLanguageModels = [
  ...anthropicModels,
  ...googleModels,
  ...openAiLanguageModels,
  ...xaiLanguageModels,
  ...perplexityModels,
  ...llamaModels,
  ...qwenModels,
  ...deepseekModels,
];

export const allImageModels = [...openAiImageModels, ...xaiImageModels];
