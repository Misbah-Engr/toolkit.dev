import type { exaParameters } from "./exa/base";
import type { ExaTools } from "./exa/tools/tools";
import type { githubParameters } from "./github/base";
import type { GithubTools } from "./github/tools";
import type { imageParameters } from "./image/base";
import type { ImageTools } from "./image/tools/tools";

export enum Servers {
  Exa = "exa",
  Image = "image",
  Github = "github",
}

export type ServerToolNames = {
  [Servers.Exa]: ExaTools;
  [Servers.Image]: ImageTools;
  [Servers.Github]: GithubTools;
};

export type ServerToolParameters = {
  [Servers.Exa]: typeof exaParameters.shape;
  [Servers.Image]: typeof imageParameters.shape;
  [Servers.Github]: typeof githubParameters.shape;
};
