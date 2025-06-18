import type { ImageModel, LanguageModel } from "@/ai/types";

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
