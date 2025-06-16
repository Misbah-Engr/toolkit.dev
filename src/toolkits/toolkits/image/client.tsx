import { ImageIcon } from "lucide-react";

import { ImageTools } from "./tools/tools";
import { createClientToolkit } from "@/toolkits/create-toolkit";
import { generateToolConfigClient } from "./tools/generate/client";
import { baseImageToolkitConfig } from "./base";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { ModelProviderIcon } from "@/components/ui/model-icon";
import { HStack } from "@/components/ui/stack";

export const imageClientToolkit = createClientToolkit<
  ImageTools,
  typeof baseImageToolkitConfig.parameters.shape
>(
  baseImageToolkitConfig,
  {
    name: "Image Generation",
    description: "Let your creativity flow",
    icon: ImageIcon,
    form: ({ parameters, setParameters }) => {
      const { data: imageModels } = api.models.getImageModels.useQuery();

      return (
        <div className="flex flex-col gap-2">
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
              className="h-fit flex-1 justify-between"
            >
              <HStack>
                <ModelProviderIcon provider={model.provider} />
                <p className="text-sm">{model.name}</p>
              </HStack>
              <p className="text-xs opacity-60">{model.modelId}</p>
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
