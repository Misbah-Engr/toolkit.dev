import { baseExaServerConfig, ExaTools } from "./base-config";
import { createServerConfigClient } from "../../create-server-config";
import { exaSearchToolConfigClient } from "./tools/search/client";

export const exaClientConfig = createServerConfigClient(baseExaServerConfig, {
  [ExaTools.Search]: exaSearchToolConfigClient,
});
