import type { providers } from "./ai/registry";

export type Provider = keyof typeof providers;

export type Model = {
  name: string;
  provider: Provider;
  modelId: string;
};
