import { exaClientConfig } from "./exa/client-config";

import type { McpServerConfigClient } from "../types";
import { Servers, type ServerToolNames } from "./shared";

export const clientConfigs: Record<
  Servers,
  McpServerConfigClient<ServerToolNames[Servers]>
> = {
  [Servers.Exa]: exaClientConfig,
};
