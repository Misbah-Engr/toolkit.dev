import { createProviderRegistry } from "ai";

import { openai } from "@ai-sdk/openai";
import { xai } from "@ai-sdk/xai";

export const registry = createProviderRegistry({
  openai,
  xai,
});
