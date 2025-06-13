import { exaClientConfig } from "./exa/client-config";

import type { McpServerConfigClient } from "../types";
import { Servers, type ServerToolNames } from "./shared";
import { imageClientConfig } from "./image/client-config";

type ClientConfigs = {
  [K in Servers]: McpServerConfigClient<ServerToolNames[K]>;
};

export const clientConfigs: ClientConfigs = {
  [Servers.Exa]: exaClientConfig,
  [Servers.Image]: imageClientConfig,
};

// Helper function to properly type server config lookup
export function getServerConfig<T extends Servers>(
  server: T,
): McpServerConfigClient<ServerToolNames[T]> {
  return clientConfigs[server] as McpServerConfigClient<ServerToolNames[T]>;
}
