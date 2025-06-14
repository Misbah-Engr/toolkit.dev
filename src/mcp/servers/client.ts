import type { ClientToolkit } from "../types";
import {
  Servers,
  type ServerToolNames,
  type ServerToolParameters,
} from "./shared";
import { exaClientToolkit } from "./exa/client";
import { imageClientToolkit } from "./image/client";

type ClientToolkits = {
  [K in Servers]: ClientToolkit<ServerToolNames[K], ServerToolParameters[K]>;
};

export const clientToolkits: ClientToolkits = {
  [Servers.Exa]: exaClientToolkit,
  [Servers.Image]: imageClientToolkit,
};

export function getClientToolkit<T extends Servers>(
  server: T,
): ClientToolkit<ServerToolNames[T], ServerToolParameters[T]> {
  return clientToolkits[server];
}
