import type { ProviderMetadata } from "ai";

export enum LanguageModelCapability {
  Vision = "vision",
  WebSearch = "web-search",
  Reasoning = "reasoning",
  Pdf = "pdf",
  ToolCalling = "tool-calling",
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

export enum SearchOptions {
  Native = "Native",
  OpenAiResponses = "OpenAI Responses",
  Exa = "Exa Search",
}

export type ImageModelProvider = "openai" | "xai";

export type ImageModel = {
  name: string;
  provider: ImageModelProvider;
  modelId: string;
  description?: string;
};
