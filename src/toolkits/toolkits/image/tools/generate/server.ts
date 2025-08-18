import { type baseGenerateTool } from "./base";
import type { ServerToolConfig } from "@/toolkits/types";
import { put } from "@vercel/blob";
import { api } from "@/trpc/server";
import type { imageParameters } from "../../base";
import type z from "zod";
import { generateImage } from "@/ai/image/generate";

export const generateToolConfigServer = (
  parameters: z.infer<typeof imageParameters>,
): ServerToolConfig<
  typeof baseGenerateTool.inputSchema.shape,
  typeof baseGenerateTool.outputSchema.shape
> => {
  return {
    callback: async ({ prompt }) => {
      const result = await generateImage(parameters.model, prompt);
      if (!result) throw new Error("No image generated");

      // If we already have a remote URL, persist metadata only.
      if (result.url) {
        await api.images.createImage({
          url: result.url,
          contentType: result.mimeType,
        });
        return { url: result.url };
      }

      if (!result.bytes) throw new Error("Image result missing bytes");
      const imageId = crypto.randomUUID();
      const ext = result.mimeType.split("/")[1] || "png";
      const fileName = `images/${imageId}.${ext}`;
      const file = new File([result.bytes], fileName, { type: result.mimeType });

      const { url } = await put(file.name, file, { access: "public" });
      await api.images.createImage({ url, contentType: result.mimeType });
      return { url };
    },
  };
};
