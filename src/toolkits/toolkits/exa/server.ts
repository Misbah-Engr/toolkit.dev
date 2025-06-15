import { createServerToolkit } from "@/toolkits/create-toolkit";
import { baseExaToolkitConfig } from "./base";
import { exaSearchToolConfigServer } from "./tools/search/server";
import { ExaTools } from "./tools/tools";

export const exaToolkitServer = createServerToolkit(
  baseExaToolkitConfig,
  async () => {
    return {
      [ExaTools.Search]: exaSearchToolConfigServer,
    };
  },
);
