import { customProvider } from "ai";
import { openai as openaiBase } from "@ai-sdk/openai";

import { openAiImageModels, openAiLanguageModels } from "../models/openai";

export const openai = customProvider({
  languageModels: Object.fromEntries(
    openAiLanguageModels.map((model) => [
      `${model.modelId}`,
      openaiBase.responses(model.modelId),
    ]),
  ),
  imageModels: Object.fromEntries(
    openAiImageModels.map((model) => [
      model.modelId,
      openaiBase.image(model.modelId),
    ]),
  ),
});
