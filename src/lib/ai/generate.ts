import { generateText as generateTextAi, streamText as streamTextAi } from "ai";

import { openai } from "./providers/openai";

export const generateText = (
  params: Omit<Parameters<typeof generateTextAi>[0], "model">,
) => {
  return generateTextAi({
    model: openai("gpt-4o"),
    ...params,
  });
};

export const streamText = (
  params: Omit<Parameters<typeof streamTextAi>[0], "model">,
) => {
  return streamTextAi({
    model: openai("gpt-4o"),
    ...params,
  });
};
