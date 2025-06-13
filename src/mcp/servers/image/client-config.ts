import { baseImageServerConfig, ImageTools } from "./base-config";
import { createServerConfigClient } from "../../create-server-config";
import { generateToolConfigClient } from "./tools/generate/client";

export const imageClientConfig = createServerConfigClient(
  baseImageServerConfig,
  {
    [ImageTools.Generate]: generateToolConfigClient,
  },
);
