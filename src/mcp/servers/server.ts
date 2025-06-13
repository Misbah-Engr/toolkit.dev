import { exaServerConfig } from "./exa/server-config";

import type { McpServerConfigServer } from "../types";
import { Servers, type ServerToolNames } from "./shared";

export const serverConfigs: Record<
  Servers,
  McpServerConfigServer<ServerToolNames[Servers]>
> = {
  [Servers.Exa]: exaServerConfig,
};
