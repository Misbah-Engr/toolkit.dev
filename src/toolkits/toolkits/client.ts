import type { ClientToolkit } from "../types";
import {
  Servers,
  type ServerToolNames,
  type ServerToolParameters,
} from "./shared";
import { exaClientToolkit } from "./exa/client";
import { imageClientToolkit } from "./image/client";
import { githubClientToolkit } from "./github/client";
import { googleCalendarClientToolkit } from "./google-calendar/client";
import { mem0ClientToolkit } from "./mem0/client";

type ClientToolkits = {
  [K in Servers]: ClientToolkit<ServerToolNames[K], ServerToolParameters[K]>;
};

export const clientToolkits: ClientToolkits = {
  [Servers.Exa]: exaClientToolkit,
  [Servers.Image]: imageClientToolkit,
  [Servers.Github]: githubClientToolkit,
  [Servers.GoogleCalendar]: googleCalendarClientToolkit,
  [Servers.Memory]: mem0ClientToolkit,
};

export function getClientToolkit<T extends Servers>(
  server: T,
): ClientToolkit<ServerToolNames[T], ServerToolParameters[T]> {
  return clientToolkits[server];
}
