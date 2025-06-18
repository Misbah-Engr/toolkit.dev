import { generateText as generateTextAi, streamText as streamTextAi } from "ai";

import { openrouter } from "@openrouter/ai-sdk-provider";

export const generateText = (
  model: `${string}/${string}`,
  params: Omit<Parameters<typeof generateTextAi>[0], "model">,
) => {
  return generateTextAi({
    model: openrouter(model),
    ...params,
  });
};

export const streamText = (
  model: `${string}/${string}`,
  params: Omit<Parameters<typeof streamTextAi>[0], "model">,
) => {
  return streamTextAi({
    model: openrouter(model),
    ...params,
  });
};
