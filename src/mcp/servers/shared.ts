import type { ExaTools } from "./exa/base-config";

export enum Servers {
  Exa = "exa",
}

export type ServerToolNames = {
  [Servers.Exa]: ExaTools;
};
