import { env } from "@/env";
import { openAiImageModels } from "./models/openai";
import { xaiImageModels } from "./models/xai";
import { fireworksImageModels } from "./models/fireworks";
import { falImageModels } from "./models/fal";

export const allImageModels = [
  ...openAiImageModels,
  ...xaiImageModels,
  ...falImageModels,
  ...fireworksImageModels,
];

export const imageModels = [
  ...("OPENAI_API_KEY" in env ? openAiImageModels : []),
  ...("XAI_API_KEY" in env ? xaiImageModels : []),
  ...("FAL_API_KEY" in env ? falImageModels : []),
  ...("FIREWORKS_API_KEY" in env ? fireworksImageModels : []),
];
