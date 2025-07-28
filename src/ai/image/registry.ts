import { createProviderRegistry } from "ai";

import { openai } from "@ai-sdk/openai";
import { xai } from "@ai-sdk/xai";
import { fireworks } from "@ai-sdk/fireworks";
import { fal } from "@ai-sdk/fal";
import { luma } from "@ai-sdk/luma";

export const imageModelRegistry = createProviderRegistry({
  openai,
  xai,
  fireworks,
  fal,
  luma,
});
