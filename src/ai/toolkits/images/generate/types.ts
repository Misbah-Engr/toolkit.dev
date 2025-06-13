import { type z } from "zod";

export type ImageGenerationParams = {
  prompt: string;
};

export type ImageGenerationResult = {
  url: string;
};
