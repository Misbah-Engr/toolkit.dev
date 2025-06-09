import { generateText as generateTextAi, streamText as streamTextAi } from "ai";

import { type providers, registry } from "./registry";

export const generateText = (
  model: `${keyof typeof providers}:${string}`,
  params: Omit<Parameters<typeof generateTextAi>[0], "model">,
) => {
  return generateTextAi({
    model: registry.languageModel(model),
    ...params,
  });
};

export const streamText = (
  model: `${keyof typeof providers}:${string}`,
  params: Omit<Parameters<typeof streamTextAi>[0], "model">,
) => {
  return streamTextAi({
    model: registry.languageModel(model),
    ...params,
  });
};
