import type { ProviderMetadata } from "ai";
import type { providers } from "./registry";

export type Provider = keyof typeof providers;

export enum ModelCapability {
  Vision = "vision",
  WebSearch = "web-search",
  Reasoning = "reasoning",
  Pdf = "pdf",
  ToolCalling = "tool-calling",
}

export type Model = {
  name: string;
  provider: Provider;
  modelId: string;
  description?: string;
  capabilities?: ModelCapability[];
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
