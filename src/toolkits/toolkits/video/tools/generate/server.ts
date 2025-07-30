import type { ServerToolConfig } from "@/toolkits/types";
import type { baseGenerateTool } from "./base";
import type { videoParameters } from "../../base";
import type z from "zod";


export const generateToolConfigServer = (
  parameters: z.infer<typeof videoParameters>,
): ServerToolConfig<
  typeof baseGenerateTool.inputSchema.shape,
  typeof baseGenerateTool.outputSchema.shape
> => {

};