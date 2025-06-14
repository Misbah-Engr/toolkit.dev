// for type inference

import { openAiImageModels, openAiLanguageModels } from "./openai";
import { xaiImageModels, xaiLanguageModels } from "./xai";
import { perplexityModels } from "./perplexity";
import { googleModels } from "./google";
import { anthropicModels } from "./anthropic";

export const allLanguageModels = [
  ...anthropicModels,
  ...googleModels,
  ...openAiLanguageModels,
  ...xaiLanguageModels,
  ...perplexityModels,
];

export const allImageModels = [...openAiImageModels, ...xaiImageModels];
