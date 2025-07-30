// Types for the setup system

export type ColorKey =
  | "reset"
  | "bright"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan";

export interface SetupConfig {
  useDocker: boolean;
  useDockerCompose: boolean;
  setupRedis: boolean;
  configureApiKeys: boolean;
  startDevServer: boolean;
}

export interface ServiceConfig {
  name: string;
  url: string;
  description: string;
  required: boolean;
}

export interface SetupStep {
  name: string;
  description: string;
  execute: () => Promise<boolean>;
}
