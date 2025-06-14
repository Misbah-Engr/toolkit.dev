import type { exaParameters } from "./exa/base";
import type { ExaTools } from "./exa/tools/tools";
import type { imageParameters } from "./image/base";
import type { ImageTools } from "./image/tools/tools";

export enum Servers {
  Exa = "exa",
  Image = "image",
}

export type ServerToolNames = {
  [Servers.Exa]: ExaTools;
  [Servers.Image]: ImageTools;
};

export type ServerToolParameters = {
  [Servers.Exa]: typeof exaParameters.shape;
  [Servers.Image]: typeof imageParameters.shape;
};
