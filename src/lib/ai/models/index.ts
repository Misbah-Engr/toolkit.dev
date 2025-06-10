import { env } from "@/env";

import { anthropicModels } from "./anthropic";
import { googleModels } from "./google";
import { openAiModels } from "./openai";
import { xaiModels } from "./xai";
import { perplexityModels } from "./perplexity";

export const models = [
  ...("ANTHROPIC_API_KEY" in env ? anthropicModels : []),
  ...("GOOGLE_GENERATIVE_AI_API_KEY" in env ? googleModels : []),
  ...("OPENAI_API_KEY" in env ? openAiModels : []),
  ...("XAI_API_KEY" in env ? xaiModels : []),
  ...("PERPLEXITY_API_KEY" in env ? perplexityModels : []),
];
