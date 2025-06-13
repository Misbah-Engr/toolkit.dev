import type { ExaTools } from "./exa/base-config";
import type { ImageTools } from "./image/base-config";

export enum Servers {
  Exa = "exa",
  Image = "image",
}

export type ServerToolNames = {
  [Servers.Exa]: ExaTools;
  [Servers.Image]: ImageTools;
};
