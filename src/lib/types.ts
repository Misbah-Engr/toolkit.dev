import type { providers } from "./ai/registry";

export type Provider = keyof typeof providers;

export enum ModelCapability {
  Thinking = "thinking",
  Vision = "vision",
  WebSearch = "web-search",
  Code = "code",
  Fast = "fast",
  Reasoning = "reasoning",
  Audio = "audio",
  Pdf = "pdf",
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
};
