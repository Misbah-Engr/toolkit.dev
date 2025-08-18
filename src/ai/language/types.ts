// ProviderMetadata: retained for compatibility; if the upstream SDK exposes a richer type, prefer importing it.
export type ProviderMetadata = Record<string, unknown>;

export enum LanguageModelCapability {
  Vision = "vision",
  WebSearch = "web-search",
  Reasoning = "reasoning",
  Pdf = "pdf",
  ToolCalling = "tool-calling",
  Free = "free",
}

export type LanguageModel = {
  name: string;
  provider: string;
  modelId: string;
  description?: string;
  capabilities?: LanguageModelCapability[];
  bestFor?: string[];
  contextLength?: number;
  isNew?: boolean;
  providerOptions?: ProviderMetadata;
};
