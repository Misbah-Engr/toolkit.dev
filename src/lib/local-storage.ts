import type { LanguageModel, ImageModel } from "@/ai/types";
import type { ClientToolkit } from "@/mcp/types";
import type { z } from "zod";

const STORAGE_KEYS = {
  SELECTED_CHAT_MODEL: "open-chat-selected-model",
  IMAGE_GENERATION_MODEL: "open-chat-image-model",
  USE_NATIVE_SEARCH: "open-chat-native-search",
  TOOLKITS: "open-chat-toolkits",
} as const;

export interface PersistedToolkit {
  id: string;
  parameters: Record<string, unknown>;
}

export interface ChatPreferences {
  selectedChatModel?: LanguageModel;
  imageGenerationModel?: ImageModel;
  useNativeSearch?: boolean;
  toolkits?: PersistedToolkit[];
}

// Helper to safely parse JSON from localStorage
const safeParseJson = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

// Helper to safely stringify and store to localStorage
const safeSetItem = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Failed to save to localStorage:", error);
  }
};

export const localStorageUtils = {
  // Get all preferences at once
  getPreferences(): ChatPreferences {
    if (typeof window === "undefined") return {};

    return {
      selectedChatModel: safeParseJson(
        localStorage.getItem(STORAGE_KEYS.SELECTED_CHAT_MODEL),
        undefined,
      ),
      imageGenerationModel: safeParseJson(
        localStorage.getItem(STORAGE_KEYS.IMAGE_GENERATION_MODEL),
        undefined,
      ),
      useNativeSearch: safeParseJson(
        localStorage.getItem(STORAGE_KEYS.USE_NATIVE_SEARCH),
        false,
      ),
      toolkits: safeParseJson(localStorage.getItem(STORAGE_KEYS.TOOLKITS), []),
    };
  },

  // Save model selection
  setSelectedChatModel(model: LanguageModel | undefined): void {
    safeSetItem(STORAGE_KEYS.SELECTED_CHAT_MODEL, model);
  },

  // Save image generation model
  setImageGenerationModel(model: ImageModel | undefined): void {
    safeSetItem(STORAGE_KEYS.IMAGE_GENERATION_MODEL, model);
  },

  // Save native search preference
  setUseNativeSearch(enabled: boolean): void {
    safeSetItem(STORAGE_KEYS.USE_NATIVE_SEARCH, enabled);
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
    safeSetItem(STORAGE_KEYS.TOOLKITS, persistedToolkits);
  },

  // Clear all preferences
  clearPreferences(): void {
    if (typeof window === "undefined") return;

    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  },

  // Clear specific preference
  clearSelectedChatModel(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEYS.SELECTED_CHAT_MODEL);
  },

  clearToolkits(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEYS.TOOLKITS);
  },
};
