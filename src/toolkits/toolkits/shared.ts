import type { exaParameters } from "./exa/base";
import type { ExaTools } from "./exa/tools/tools";
import type { githubParameters } from "./github/base";
import type { GithubTools } from "./github/tools";
import type { googleCalendarParameters } from "./google-calendar/base";
import type { GoogleCalendarTools } from "./google-calendar/tools";
import type { googleDriveParameters } from "./google-drive/base";
import type { GoogleDriveTools } from "./google-drive/tools";
import type { imageParameters } from "./image/base";
import type { ImageTools } from "./image/tools/tools";
import type { mem0Parameters } from "./mem0/base";
import type { Mem0Tools } from "./mem0/tools/tools";
import type { e2bParameters } from "./e2b/base";
import type { E2BTools } from "./e2b/tools/tools";

export enum Servers {
  Exa = "exa",
  Image = "image",
  Github = "github",
  GoogleCalendar = "google-calendar",
  GoogleDrive = "google-drive",
  Memory = "memory",
  E2B = "e2b",
}

export type ServerToolNames = {
  [Servers.Exa]: ExaTools;
  [Servers.Image]: ImageTools;
  [Servers.Github]: GithubTools;
  [Servers.GoogleCalendar]: GoogleCalendarTools;
  [Servers.GoogleDrive]: GoogleDriveTools;
  [Servers.Memory]: Mem0Tools;
  [Servers.E2B]: E2BTools;
};

export type ServerToolParameters = {
  [Servers.Exa]: typeof exaParameters.shape;
  [Servers.Image]: typeof imageParameters.shape;
  [Servers.Github]: typeof githubParameters.shape;
  [Servers.GoogleCalendar]: typeof googleCalendarParameters.shape;
  [Servers.GoogleDrive]: typeof googleDriveParameters.shape;
  [Servers.Memory]: typeof mem0Parameters.shape;
  [Servers.E2B]: typeof e2bParameters.shape;
};
