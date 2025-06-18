import { createProviderRegistry } from "ai";

import { openai } from "./providers/openai";
import { google } from "./providers/google";
import { llama } from "./providers/llama";
import { perplexity } from "@ai-sdk/perplexity";
import { anthropic } from "@ai-sdk/anthropic";
import { xai } from "@ai-sdk/xai";

import { env } from "@/env";

export const providers = {
  ...(env.OPENAI_API_KEY ? { openai } : {}),
  ...(env.ANTHROPIC_API_KEY ? { anthropic } : {}),
  ...(env.XAI_API_KEY ? { xai } : {}),
  ...(env.GOOGLE_GENERATIVE_AI_API_KEY ? { google } : {}),
  ...(env.PERPLEXITY_API_KEY ? { perplexity } : {}),
  ...(env.GROQ_API_KEY ? { llama } : {}),
};

export const registry = createProviderRegistry({
  openai,
  anthropic,
  xai,
  google,
  perplexity,
  llama,
});
