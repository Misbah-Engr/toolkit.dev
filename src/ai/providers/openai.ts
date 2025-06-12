import { customProvider } from "ai";
import { openai as openaiBase } from "@ai-sdk/openai";

import { openAiModels } from "../models/openai";

import { ModelCapability } from "@/ai/types";

export const openai = customProvider({
  languageModels: {
    ...Object.fromEntries(
      openAiModels.map((model) => [model.modelId, openaiBase(model.modelId)]),
    ),
    // responses models
    ...Object.fromEntries(
      openAiModels
        .filter(
          (model) => !model.capabilities?.includes(ModelCapability.WebSearch),
        )
        .map((model) => [
          `${model.modelId}-responses`,
          openaiBase.responses(model.modelId),
        ]),
    ),
  },
});
