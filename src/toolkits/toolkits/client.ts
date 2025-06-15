import type { ClientToolkit } from "../types";
import {
  Servers,
  type ServerToolNames,
  type ServerToolParameters,
} from "./shared";
import { exaClientToolkit } from "./exa/client";
import { imageClientToolkit } from "./image/client";
import { githubClientToolkit } from "./github/client";
import { mem0ClientToolkit } from "./mem0/client";
import { notionClientToolkit } from "./notion/client";

type ClientToolkits = {
  [K in Servers]: ClientToolkit<ServerToolNames[K], ServerToolParameters[K]>;
};

export const clientToolkits: ClientToolkits = {
  [Servers.Exa]: exaClientToolkit,
  [Servers.Image]: imageClientToolkit,
  [Servers.Github]: githubClientToolkit,
  [Servers.Memory]: mem0ClientToolkit,
  [Servers.Notion]: notionClientToolkit,
};

export function getClientToolkit<T extends Servers>(
  server: T,
): ClientToolkit<ServerToolNames[T], ServerToolParameters[T]> {
  return clientToolkits[server];
}
