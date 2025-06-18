import { groq as groqBase } from "@ai-sdk/groq";

import { customProvider } from "ai";
import { qwenModels } from "../models/qwen";

export const qwen = customProvider({
  languageModels: {
    ...Object.fromEntries(
      qwenModels.map((model) => [model.modelId, groqBase(model.modelId)]),
    ),
  },
});
