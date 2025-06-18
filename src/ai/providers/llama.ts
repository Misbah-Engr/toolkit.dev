import { groq as groqBase } from "@ai-sdk/groq";

import { customProvider } from "ai";
import { llamaModels } from "../models/llama";

export const llama = customProvider({
  languageModels: {
    ...Object.fromEntries(
      llamaModels.map((model) => [model.modelId, groqBase(model.modelId)]),
    ),
  },
});
