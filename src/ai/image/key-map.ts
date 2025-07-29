import type { ImageModelProvider } from "./types";

export const imageKeyMap: Record<ImageModelProvider, string> = {
  openai: "OPENAI_API_KEY",
  xai: "XAI_API_KEY",
  fal: "FAL_API_KEY",
  fireworks: "FIREWORKS_API_KEY",
  luma: "LUMA_API_KEY",
};
