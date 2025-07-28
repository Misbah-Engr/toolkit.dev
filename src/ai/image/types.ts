export type ImageModelProvider =
  | "openai"
  | "xai"
  | "fal"
  | "fireworks"
  | "luma";

export type ImageModel = {
  name: string;
  provider: ImageModelProvider;
  modelId: string;
};
