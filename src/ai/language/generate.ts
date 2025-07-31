import { generateText as generateTextAi, streamText as streamTextAi } from "ai";

import { openrouter } from "@openrouter/ai-sdk-provider";

// Add headers directly to the OpenRouter client
const headers = {
  "HTTP-Referer": "https://toolkit.dev",
  "X-Title": "Toolkit.dev",
};

export const generateText = (
  model: `${string}/${string}`,
  params: Omit<Parameters<typeof generateTextAi>[0], "model">,
) => {
  return generateTextAi({
    model: openrouter(model),
    headers,
    ...params,
  });
};

export const streamText = (
  model: `${string}/${string}`,
  params: Omit<Parameters<typeof streamTextAi>[0], "model">,
) => {
  return streamTextAi({
    model: openrouter(model),
    headers,
    ...params,
  });
};
