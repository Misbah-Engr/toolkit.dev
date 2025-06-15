import type { exaParameters } from "./exa/base";
import type { ExaTools } from "./exa/tools/tools";
import type { githubParameters } from "./github/base";
import type { GithubTools } from "./github/tools";
import type { imageParameters } from "./image/base";
import type { ImageTools } from "./image/tools/tools";
import type { mem0Parameters } from "./mem0/base";
import type { Mem0Tools } from "./mem0/tools/tools";
import type { notionParameters } from "./notion/base";
import type { NotionTools } from "./notion/tools";

export enum Servers {
  Exa = "exa",
  Image = "image",
  Github = "github",
  Memory = "memory",
  Notion = "notion",
}

export type ServerToolNames = {
  [Servers.Exa]: ExaTools;
  [Servers.Image]: ImageTools;
  [Servers.Github]: GithubTools;
  [Servers.Memory]: Mem0Tools;
  [Servers.Notion]: NotionTools;
};

export type ServerToolParameters = {
  [Servers.Exa]: typeof exaParameters.shape;
  [Servers.Image]: typeof imageParameters.shape;
  [Servers.Github]: typeof githubParameters.shape;
  [Servers.Memory]: typeof mem0Parameters.shape;
  [Servers.Notion]: typeof notionParameters.shape;
};
