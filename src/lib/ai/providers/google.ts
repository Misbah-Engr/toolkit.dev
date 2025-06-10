import { customProvider } from "ai";
import { google as googleBase } from "@ai-sdk/google";

import { googleModels } from "../models/google";

export const google = customProvider({
  languageModels: {
    ...Object.fromEntries(
      googleModels.map((model) => [model.modelId, googleBase(model.modelId)]),
    ),
    // search models
    ...Object.fromEntries(
      googleModels.map((model) => [
        `${model.modelId}-search`,
        googleBase(model.modelId, {
          useSearchGrounding: true,
        }),
      ]),
    ),
  },
});
