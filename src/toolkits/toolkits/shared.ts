import type { exaParameters } from "./exa/base";
import type { ExaTools } from "./exa/tools/tools";
import type { githubParameters } from "./github/base";
import type { GithubTools } from "./github/tools";
import type { googleCalendarParameters } from "./google-calendar/base";
import type { GoogleCalendarTools } from "./google-calendar/tools";
import type { imageParameters } from "./image/base";
import type { ImageTools } from "./image/tools/tools";
import type { mem0Parameters } from "./mem0/base";
import type { Mem0Tools } from "./mem0/tools/tools";

export enum Servers {
  Exa = "exa",
  Image = "image",
  Github = "github",
  GoogleCalendar = "google-calendar",
  Memory = "memory",
}

export type ServerToolNames = {
  [Servers.Exa]: ExaTools;
  [Servers.Image]: ImageTools;
  [Servers.Github]: GithubTools;
  [Servers.GoogleCalendar]: GoogleCalendarTools;
  [Servers.Memory]: Mem0Tools;
};

export type ServerToolParameters = {
  [Servers.Exa]: typeof exaParameters.shape;
  [Servers.Image]: typeof imageParameters.shape;
  [Servers.Github]: typeof githubParameters.shape;
  [Servers.GoogleCalendar]: typeof googleCalendarParameters.shape;
  [Servers.Memory]: typeof mem0Parameters.shape;
};
