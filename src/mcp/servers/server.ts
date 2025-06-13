import { exaServerConfig } from "./exa/server-config";
import { imageServerConfig } from "./image/server-config";

import type { McpServerConfigServer } from "../types";
import { Servers, type ServerToolNames } from "./shared";

export const serverConfigs = {
  [Servers.Exa]: exaServerConfig,
  [Servers.Image]: imageServerConfig,
};
