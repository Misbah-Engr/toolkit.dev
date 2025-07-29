import type { ImageModelProvider } from "@/ai/image/types";
import { Link } from "../components/link";
import type { EnvVar, EnvVars } from "@/toolkits/types";

const openAIImageEnvVar = {
  key: "OPENAI_API_KEY",
  description: (
    <span>
      Get an OpenAI API Key{" "}
      <Link href="https://platform.openai.com/api-keys">here</Link>
    </span>
  ),
};

const xaiImageEnvVar = {
  key: "XAI_API_KEY",
  description: (
    <span>
      Get an XAI API Key <Link href="https://console.x.ai/">here</Link>
    </span>
  ),
};

const falImageEnvVar = {
  key: "FAL_API_KEY",
  description: (
    <span>
      Get an FAL API Key <Link href="https://fal.ai/dashboard/keys">here</Link>
    </span>
  ),
};

const lumaImageEnvVar = {
  key: "LUMA_API_KEY",
  description: (
    <span>
      Get an Luma API Key <Link href="https://lumalabs.ai/api/keys">here</Link>
    </span>
  ),
};

const fireworksImageEnvVar = {
  key: "FIREWORKS_API_KEY",
  description: (
    <span>
      Get an Fireworks API Key{" "}
      <Link href="https://app.fireworks.ai/settings/users/api-keys">here</Link>
    </span>
  ),
};

export const imageEnvVars: EnvVars = [
  {
    type: "any",
    keys: [
      openAIImageEnvVar,
      xaiImageEnvVar,
      falImageEnvVar,
      fireworksImageEnvVar,
      lumaImageEnvVar,
    ],
  },
  {
    type: "all",
    keys: ["BLOB_READ_WRITE_TOKEN"],
    description: (
      <span>
        Get a Vercel Blob Token{" "}
        <Link href="https://vercel.com/docs/vercel-blob">here</Link>
      </span>
    ),
  },
];

export const imageEnvVarMap: Record<ImageModelProvider, EnvVar> = {
  openai: openAIImageEnvVar,
  xai: xaiImageEnvVar,
  fal: falImageEnvVar,
  fireworks: fireworksImageEnvVar,
  luma: lumaImageEnvVar,
};
