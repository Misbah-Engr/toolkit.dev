import z from "zod";

import { tool, experimental_generateImage as generateImage } from "ai";

import type { ImageGenerationParams, ImageGenerationResult } from "./types";
import { registry } from "@/ai/registry";
import { put } from "@vercel/blob";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";

export const imageGeneration = (
  modelId:
    | `openai:${string}`
    | `anthropic:${string}`
    | `xai:${string}`
    | `google:${string}`
    | `perplexity:${string}`,
) =>
  tool<ImageGenerationParams, ImageGenerationResult>({
    description: "Search the web for up-to-date information",
    parameters: z.object({
      prompt: z
        .string()
        .min(1)
        .max(100)
        .describe("The image generation prompt"),
    }),
    execute: async ({ prompt }) => {
      const { image } = await generateImage({
        model: registry.imageModel(modelId),
        prompt,
      });

      if (!image) {
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
  });
