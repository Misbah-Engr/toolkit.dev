import { env } from "@/env";

import { type LanguageModel } from "@/ai/types";

import { anthropicModels } from "./anthropic";
import { googleModels } from "./google";
import { openAiLanguageModels, openAiImageModels } from "./openai";
import { xaiImageModels, xaiLanguageModels } from "./xai";
import { perplexityModels } from "./perplexity";
import { llamaModels } from "./llama";
import { qwenModels } from "./qwen";

export const languageModels: LanguageModel[] = [
  ...("ANTHROPIC_API_KEY" in env ? anthropicModels : []),
  ...("GOOGLE_GENERATIVE_AI_API_KEY" in env ? googleModels : []),
  ...("OPENAI_API_KEY" in env ? openAiLanguageModels : []),
  ...("XAI_API_KEY" in env ? xaiLanguageModels : []),
  ...("PERPLEXITY_API_KEY" in env ? perplexityModels : []),
  ...("OPENROUTER_API_KEY" in env ? llamaModels : []),
  ...("OPENROUTER_API_KEY" in env ? qwenModels : []),
];

export const imageModels = [
  ...("OPENAI_API_KEY" in env ? openAiImageModels : []),
  ...("XAI_API_KEY" in env ? xaiImageModels : []),
];
