import { experimental_generateImage as generateImage } from "ai";

import { type baseGenerateTool } from "./base";
import type { ServerToolConfig } from "@/mcp/types";
import { registry } from "@/ai/registry";
import { put } from "@vercel/blob";
import { api } from "@/trpc/server";

export const generateToolConfigServer: ServerToolConfig<
  typeof baseGenerateTool.inputSchema.shape,
  typeof baseGenerateTool.outputSchema.shape
> = {
  callback: async ({ prompt }) => {
    const { image } = await generateImage({
      model: registry.imageModel("xai:grok-2-image"),
      prompt,
    });

    if (!image) {
      console.error("No image generated");
      throw new Error("No image generated");
    }

    const imageId = crypto.randomUUID();

    const file = new File(
      [image.uint8Array],
      `images/${imageId}.${image.mimeType.split("/")[1]}`,
      {
        type: image.mimeType,
      },
    );

    const { url: imageUrl } = await put(file.name, file, {
      access: "public",
    });

    await api.images.createImage({
      url: imageUrl,
      contentType: image.mimeType,
    });

    return { url: imageUrl };
  },
};
