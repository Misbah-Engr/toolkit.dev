import {
  openAiLanguageModels,
  xaiLanguageModels,
  perplexityModels,
  googleModels,
  anthropicModels,
  llamaModels,
  qwenModels,
  deepseekModels,
  openRouterModels,
} from "./models";

export const languageModels = [
  ...openRouterModels,
  ...anthropicModels,
  ...googleModels,
  ...openAiLanguageModels,
  ...xaiLanguageModels,
  ...perplexityModels,
  ...llamaModels,
  ...qwenModels,
  ...deepseekModels,
];
