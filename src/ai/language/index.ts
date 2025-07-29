import {
  openAiLanguageModels,
  xaiLanguageModels,
  perplexityModels,
  googleModels,
  anthropicModels,
  llamaModels,
  qwenModels,
  deepseekModels,
} from "./models";

export const languageModels = [
  ...anthropicModels,
  ...googleModels,
  ...openAiLanguageModels,
  ...xaiLanguageModels,
  ...perplexityModels,
  ...llamaModels,
  ...qwenModels,
  ...deepseekModels,
];
