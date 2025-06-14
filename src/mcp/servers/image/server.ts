import { createServerToolkit } from "@/mcp/create-toolkit";
import { baseImageToolkitConfig } from "./base";
import { generateToolConfigServer } from "./tools/generate/server";
import { ImageTools } from "./tools/tools";

export const imageToolkitServer = createServerToolkit(
  baseImageToolkitConfig,
  async (parameters) => {
    return {
      [ImageTools.Generate]: generateToolConfigServer(parameters),
    };
  },
);
