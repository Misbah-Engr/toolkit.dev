import { setCookie } from "cookies-next/client";
import type { ImageModel, LanguageModel } from "@/ai/types";
import { COOKIE_KEYS } from "./keys";
import type { ClientToolkit } from "@/toolkits/types";
import type { z } from "zod";
import type { PersistedToolkit } from "./types";

// Client-side cookie utilities
export const clientCookieUtils = {
  // Save model selection
  setSelectedChatModel(model: LanguageModel | undefined): void {
    setCookie(COOKIE_KEYS.SELECTED_CHAT_MODEL, model);
  },

  // Save image generation model
  setImageGenerationModel(model: ImageModel | undefined): void {
    setCookie(COOKIE_KEYS.IMAGE_GENERATION_MODEL, model);
  },

  // Save native search preference
  setUseNativeSearch(enabled: boolean): void {
    setCookie(COOKIE_KEYS.USE_NATIVE_SEARCH, enabled);
  },

  // Save toolkits
  setToolkits(
    toolkits: Array<{
      id: string;
      toolkit: ClientToolkit;
      parameters: z.infer<ClientToolkit["parameters"]>;
    }>,
  ): void {
    const persistedToolkits: PersistedToolkit[] = toolkits.map((t) => ({
      id: t.id,
      parameters: t.parameters,
    }));
    setCookie(COOKIE_KEYS.TOOLKITS, persistedToolkits);
  },
};
