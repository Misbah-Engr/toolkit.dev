import type { ImageModelProvider } from "./types";
import { createOpenAI } from "@ai-sdk/openai"; // example provider (extend as needed)
import { generateImage as sdkGenerateImage } from "ai";

// We intentionally do not redefine SDK return types; we adapt to what the SDK returns.
export interface GeneratedImageResult {
  url: string;
  mimeType: string;
  bytes?: Uint8Array;
}

// Basic provider routing; extend with other providers if needed.
function getProvider(model: `${ImageModelProvider}:${string}`) {
  const [provider] = model.split(":");
  switch (provider) {
    case "openai":
      return createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
    default:
      throw new Error(`Unsupported image provider: ${provider}`);
  }
}

export async function generateImage(
  model: `${ImageModelProvider}:${string}`,
  prompt: string,
): Promise<GeneratedImageResult> {
  const provider = getProvider(model);
  // The v5 SDK generateImage returns an iterator/stream or object depending on provider; we assume a simple call pattern.
  const { image } = await sdkGenerateImage({
    model: provider.image(model.split(":")[1]!),
    prompt,
  });

  if (!image) throw new Error("No image returned by provider");

  // Normalized shape. Some providers may give URL directly, others raw bytes.
  if (typeof image.url === "string") {
    return { url: image.url, mimeType: image.mimeType ?? "image/png" };
  }

  if (image.bytes instanceof Uint8Array) {
    // Caller is responsible for persisting bytes (we convert upstream where needed)
    return { url: "", mimeType: image.mimeType ?? "image/png", bytes: image.bytes };
  }

  throw new Error("Unrecognized image response shape");
}
