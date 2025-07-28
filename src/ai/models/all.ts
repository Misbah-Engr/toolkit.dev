// for type inference

import { openAiImageModels, openAiLanguageModels } from "./openai";
import { xaiImageModels, xaiLanguageModels } from "./xai";
import { perplexityModels } from "./perplexity";
import { googleModels } from "./google";
import { anthropicModels } from "./anthropic";
import { llamaModels } from "./llama";
import { qwenModels } from "./qwen";
import { deepseekModels } from "./deepseek";
import { fireworksImageModels, fireworksLanguageModels } from "./fireworks";
import { azureImageModels, azureLanguageModels } from "./azure";
import { googleVertexImageModels, googleVertexLanguageModels } from "./google-vertex";

export const allLanguageModels = [
  ...anthropicModels,
  ...googleModels,
  ...openAiLanguageModels,
  ...xaiLanguageModels,
  ...perplexityModels,
  ...llamaModels,
  ...qwenModels,
  ...deepseekModels,
  ...fireworksLanguageModels,
  ...azureLanguageModels,
  ...googleVertexLanguageModels,
];

export const allImageModels = [
  ...openAiImageModels, 
  ...xaiImageModels,
  ...fireworksImageModels,
  ...azureImageModels,
  ...googleVertexImageModels,
];
