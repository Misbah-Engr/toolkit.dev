import type { ServerToolConfig } from "@/toolkits/types";
import type { baseGenerateTool } from "./base";
import { put } from "@vercel/blob";
import { api } from "@/trpc/server";
import { generateVideo } from "@/ai/video/generate";
import type { videoParameters } from "../../base";
import type z from "zod";

export const generateToolConfigServer = ({
  model,
}: z.infer<typeof videoParameters>): ServerToolConfig<
  typeof baseGenerateTool.inputSchema.shape,
  typeof baseGenerateTool.outputSchema.shape
> => {
  return {
    callback: async ({ prompt }) => {
      const videoUrl = await generateVideo(model.split(":")[1]!, prompt);

      const res = await fetch(videoUrl);
      if (!res.ok) {
        console.error("Failed to fetch video from generation assets");
        throw new Error("Failed to fetch video");
      }
      const videoBlob = await res.blob();

      const videoId = crypto.randomUUID();

      const file = new File([videoBlob], `videos/${videoId}.mp4`, {
        type: "video/mp4",
      });

      const { url: videoBlobUrl } = await put(file.name, file, {
        access: "public",
      });

      await api.videos.createVideo({
        url: videoBlobUrl,
        modelId: model,
      });

      return { url: videoUrl };
    },
  };
};
