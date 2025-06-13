import { exaServerConfig } from "./exa/server-config";
import { imageServerConfig } from "./image/server-config";

import { Servers } from "./shared";

export const serverConfigs = {
  [Servers.Exa]: exaServerConfig,
  [Servers.Image]: imageServerConfig,
};
