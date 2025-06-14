import { ImageIcon } from "lucide-react";

import { ImageTools } from "./tools/tools";
import { createClientToolkit } from "@/mcp/create-toolkit";
import { generateToolConfigClient } from "./tools/generate/client";
import { baseImageToolkitConfig } from "./base";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { ModelProviderIcon } from "@/components/ui/model-icon";
import { VStack } from "@/components/ui/stack";

export const imageClientToolkit = createClientToolkit<
  ImageTools,
  typeof baseImageToolkitConfig.parameters.shape
>(
  baseImageToolkitConfig,
  {
    name: "Image Generation",
    description: "Image Generation is a tool that can generate images",
    icon: ImageIcon,
    form: ({ parameters, setParameters }) => {
      const { data: imageModels } = api.models.getImageModels.useQuery();

      return (
        <div className="flex flex-row flex-wrap gap-2">
          {imageModels?.map((model) => (
            <Button
              key={model.modelId}
              variant={
                parameters.model === `${model.provider}:${model.modelId}`
                  ? "primaryOutline"
                  : "outline"
              }
              onClick={() => {
                setParameters({
                  model: `${model.provider}:${model.modelId}` as const,
                });
              }}
              className="h-fit flex-1"
            >
              <ModelProviderIcon provider={model.provider} />
              <VStack className="items-start gap-0">
                <p className="text-sm">{model.name}</p>
                <p className="text-xs">{model.modelId}</p>
              </VStack>
            </Button>
          ))}
        </div>
      );
    },
  },
  {
    [ImageTools.Generate]: generateToolConfigClient,
  },
);
