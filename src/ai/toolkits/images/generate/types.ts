import { type z } from "zod";

export type ImageGenerationParams = z.ZodObject<{
  prompt: z.ZodString;
}>;

export type ImageGenerationResult = {
  url: string;
};
