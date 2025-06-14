import type { ServerToolkit } from "../types";
import { exaToolkitServer } from "./exa/server";
import { githubToolkitServer } from "./github/server";
import { imageToolkitServer } from "./image/server";
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
};

export function getServerToolkit<T extends Servers>(
  server: T,
): ServerToolkit<ServerToolNames[T], ServerToolParameters[T]> {
  return serverToolkits[server];
}
