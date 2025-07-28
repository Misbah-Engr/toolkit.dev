import type { LanguageModel } from "@/ai/language/types";
import type { ImageModel } from "@/ai/image/types";

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
