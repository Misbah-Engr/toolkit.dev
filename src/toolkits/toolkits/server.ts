import type { ServerToolkit } from "../types";
import { exaToolkitServer } from "./exa/server";
import { githubToolkitServer } from "./github/server";
import { googleCalendarToolkitServer } from "./google-calendar/server";
import { googleDriveToolkitServer } from "./google-drive/server";
import { imageToolkitServer } from "./image/server";
import { mem0ToolkitServer } from "./mem0/server";
import { notionToolkitServer } from "./notion/server";
import { e2bToolkitServer } from "./e2b/server";
import {
  Servers,
  type ServerToolNames,
  type ServerToolParameters,
} from "./shared";

type ServerToolkits = {
  [K in Servers]: ServerToolkit<ServerToolNames[K], ServerToolParameters[K]>;
};

export const serverToolkits: ServerToolkits = {
  [Servers.Exa]: exaToolkitServer,
  [Servers.Image]: imageToolkitServer,
  [Servers.Github]: githubToolkitServer,
  [Servers.GoogleCalendar]: googleCalendarToolkitServer,
  [Servers.GoogleDrive]: googleDriveToolkitServer,
  [Servers.Memory]: mem0ToolkitServer,
  [Servers.Notion]: notionToolkitServer,
  [Servers.E2B]: e2bToolkitServer,
};

export function getServerToolkit<T extends Servers>(
  server: T,
): ServerToolkit<ServerToolNames[T], ServerToolParameters[T]> {
  return serverToolkits[server];
}
