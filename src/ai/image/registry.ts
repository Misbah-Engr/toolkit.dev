import { createProviderRegistry } from "ai";

import { openai } from "@ai-sdk/openai";
import { xai } from "@ai-sdk/xai";
import { fireworks } from "@ai-sdk/fireworks";
import { vertex } from "@ai-sdk/google-vertex";
import { fal } from "@ai-sdk/fal";
import { bedrock } from "@ai-sdk/amazon-bedrock";
import { luma } from "@ai-sdk/luma";

export const imageModelRegistry = createProviderRegistry({
  openai,
  xai,
  fireworks,
  vertex,
  fal,
  bedrock,
  luma,
});
