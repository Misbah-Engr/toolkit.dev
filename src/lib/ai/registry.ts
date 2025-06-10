import { createProviderRegistry } from "ai";

import { openai } from "./providers/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { xai } from "@ai-sdk/xai";
import { google } from "@ai-sdk/google";

import { env } from "@/env";

export const providers = {
  ...(env.OPENAI_API_KEY ? { openai } : {}),
  ...(env.ANTHROPIC_API_KEY ? { anthropic } : {}),
  ...(env.XAI_API_KEY ? { xai } : {}),
  ...(env.GOOGLE_GENERATIVE_AI_API_KEY ? { google } : {}),
};

export const registry = createProviderRegistry({
  openai,
  anthropic,
  xai,
  google,
});
