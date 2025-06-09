import type { providers } from "./ai/registry";

export type Provider = keyof typeof providers;

export type ModelCapability = 
  | "thinking" 
  | "vision" 
  | "web-search" 
  | "code" 
  | "fast" 
  | "reasoning"
  | "audio";

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
