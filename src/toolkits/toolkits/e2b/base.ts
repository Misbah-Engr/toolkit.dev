import type { ToolkitConfig } from "@/toolkits/types";
import { baseRunCodeTool } from "./tools/run_code/base";
import { E2BTools } from "./tools/tools";
import { z } from "zod";

export const e2bParameters = z.object({});

export const baseE2BToolkitConfig: ToolkitConfig<
  E2BTools,
  typeof e2bParameters.shape
> = {
  tools: {
    [E2BTools.RunCode]: baseRunCodeTool,
  },
  parameters: e2bParameters,
};