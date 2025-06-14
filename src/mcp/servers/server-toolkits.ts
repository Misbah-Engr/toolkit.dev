import type { ServerToolkit } from "../types";
import { exaToolkitServer } from "./exa/server";
import { imageToolkitServer } from "./image/server";
import { Servers, type ServerToolNames } from "./shared";

type ServerToolkits = {
  [K in Servers]: ServerToolkit<ServerToolNames[K]>;
};

export const serverToolkits: ServerToolkits = {
  [Servers.Exa]: exaToolkitServer,
  [Servers.Image]: imageToolkitServer,
};

export function getServerToolkit<T extends Servers>(
  server: T,
): ServerToolkit<ServerToolNames[T]> {
  return serverToolkits[server];
}
