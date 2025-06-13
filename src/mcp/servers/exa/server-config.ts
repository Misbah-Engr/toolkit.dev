import { baseExaServerConfig, ExaTools } from "./base-config";
import { createServerConfigServer } from "../../create-server-config";
import { exaSearchToolConfigServer } from "./tools/search/server";

export const exaServerConfig = createServerConfigServer(baseExaServerConfig, {
  [ExaTools.Search]: exaSearchToolConfigServer,
});
