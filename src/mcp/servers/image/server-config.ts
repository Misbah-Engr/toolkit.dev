import { baseImageServerConfig, ImageTools } from "./base-config";
import { createServerConfigServer } from "../../create-server-config";
import { generateToolConfigServer } from "./tools/generate/server";

export const imageServerConfig = createServerConfigServer(
  baseImageServerConfig,
  {
    [ImageTools.Generate]: generateToolConfigServer,
  },
);
