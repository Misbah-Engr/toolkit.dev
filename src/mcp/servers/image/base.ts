import type { ToolkitConfig } from "@/mcp/types";
import { ImageTools } from "./tools/tools";
import { baseGenerateTool } from "./tools/generate/base";
import { z } from "zod";
import { allImageModels } from "@/ai/models/all";
import type { ImageModelProvider } from "@/ai/types";

export const imageParameters = z.object({
  model: z.enum(
    allImageModels.map((model) => `${model.provider}:${model.modelId}`) as [
      `${ImageModelProvider}:${string}`,
      ...`${ImageModelProvider}:${string}`[],
    ],
  ),
});

export const baseImageToolkitConfig: ToolkitConfig<
  ImageTools,
  typeof imageParameters.shape
> = {
  tools: {
    [ImageTools.Generate]: baseGenerateTool,
  },
  parameters: imageParameters,
};
