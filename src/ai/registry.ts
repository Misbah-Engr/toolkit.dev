import { createProviderRegistry } from "ai";

import { openai } from "@ai-sdk/openai";
import { xai } from "@ai-sdk/xai";
import { fireworks } from "@ai-sdk/fireworks";
import { azure } from "@ai-sdk/azure";
import { vertex } from "@ai-sdk/google-vertex";

export const registry = createProviderRegistry({
  openai,
  xai,
  fireworks,
  azure,
  vertex,
});
