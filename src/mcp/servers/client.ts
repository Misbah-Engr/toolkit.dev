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
