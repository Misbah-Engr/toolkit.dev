import { createServerToolkit } from "@/toolkits/create-toolkit";
import { baseE2BToolkitConfig } from "./base";
import { e2bRunCodeToolConfigServer } from "./tools/run_code/server";
import { E2BTools } from "./tools/tools";

export const e2bToolkitServer = createServerToolkit(
  baseE2BToolkitConfig,
  async () => {
    return {
      [E2BTools.RunCode]: e2bRunCodeToolConfigServer(),
    };
  },
);