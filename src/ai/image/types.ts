export type ImageModelProvider =
  | "openai"
  | "xai"
  | "fal"
  | "fireworks"
  | "vertex"
  | "bedrock"
  | "luma";

export type ImageModel = {
  name: string;
  provider: ImageModelProvider;
  modelId: string;
};
