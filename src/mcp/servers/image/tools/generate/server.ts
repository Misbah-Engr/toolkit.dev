import { experimental_generateImage as generateImage } from "ai";

import { type baseGenerateTool } from "./base";
import type { ServerToolConfig } from "@/mcp/types";
import { registry } from "@/ai/registry";
import { put } from "@vercel/blob";

export const generateToolConfigServer: ServerToolConfig<
  typeof baseGenerateTool.inputSchema.shape,
  typeof baseGenerateTool.outputSchema.shape
> = {
  callback: async ({ prompt }, context) => {
    const { image } = await generateImage({
      model: registry.imageModel("openai:gpt-image-1"),
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

    console.log("context.api", context.api);

    await context.api.images.createImage({
      url: imageUrl,
      contentType: image.mimeType,
    });

    return { url: imageUrl };
  },
};
