import type { ServerToolConfig } from "@/toolkits/types";
import type { baseGenerateTool } from "./base";
import type { videoParameters } from "../../base";
import { put } from "@vercel/blob";
import { api } from "@/trpc/server";
import type z from "zod";
import { generateVideo } from "@/ai/video/generate";


export const generateToolConfigServer = (): ServerToolConfig<
  typeof baseGenerateTool.inputSchema.shape,
  typeof baseGenerateTool.outputSchema.shape
> => {
  return {
    callback: async ({ prompt }) => {
      const generation = await generateVideo(prompt);

      // @ts-ignore
      if (!generation.assets.video) {
        console.error("No video generated");
        throw new Error("No video generated");
      }

      // @ts-ignore
      const video = generation.assets.video;
      const res = await fetch(video);
      if (!res.ok) {
        console.error("Failed to fetch video from generation assets");
        throw new Error("Failed to fetch video");
      }
      const videoBlob = await res.blob();

      const videoId = crypto.randomUUID();

      const file = new File(
        [videoBlob],
        `videos/${videoId}.mp4`,
        {
          type: "video/mp4",
        },
      );

      const { url: videoUrl } = await put(file.name, file, {
        access: "public",
      });

      await api.videos.createVideo({
        url: videoUrl,
        modelId: 'ray-2',
      });

      return { url: videoUrl };
    },
  }
};