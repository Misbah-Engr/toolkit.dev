import { ImageIcon } from "lucide-react";

import { ImageTools } from "./tools/tools";
import { createClientToolkit } from "@/toolkits/create-toolkit";
import { generateToolConfigClient } from "./tools/generate/client";
import { baseImageToolkitConfig } from "./base";
import { ToolkitGroups } from "@/toolkits/types";
import { Form } from "./form";
import { Link } from "../components/link";

export const imageClientToolkit = createClientToolkit<
  ImageTools,
  typeof baseImageToolkitConfig.parameters.shape
>(
  baseImageToolkitConfig,
  {
    name: "Image Generation",
    description: "Let your creativity flow",
    icon: ImageIcon,
    form: Form,
    type: ToolkitGroups.Native,
    envVars: [
      {
        type: "any",
        keys: [
          {
            key: "FAL_API_KEY",
            description: (
              <span>
                Get an FAL API Key{" "}
                <Link href="https://fal.ai/dashboard/keys">here</Link>
              </span>
            ),
          },
          {
            key: "FIREWORKS_API_KEY",
            description: (
              <span>
                Get an Fireworks API Key{" "}
                <Link href="https://app.fireworks.ai/settings/users/api-keys">
                  here
                </Link>
              </span>
            ),
          },
          {
            key: "LUMA_API_KEY",
            description: (
              <span>
                Get an Luma API Key{" "}
                <Link href="https://lumalabs.ai/api/keys">here</Link>
              </span>
            ),
          },
          {
            key: "OPENAI_API_KEY",
            description: (
              <span>
                Get an OpenAI API Key{" "}
                <Link href="https://platform.openai.com/api-keys">here</Link>
              </span>
            ),
          },
          {
            key: "XAI_API_KEY",
            description: (
              <span>
                Get an XAI API Key{" "}
                <Link href="https://console.x.ai/">here</Link>
              </span>
            ),
          },
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
    ],
  },
  {
    [ImageTools.Generate]: generateToolConfigClient,
  },
);
