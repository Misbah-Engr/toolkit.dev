import { ImageIcon } from "lucide-react";

import { ImageTools } from "./tools/tools";
import { createClientToolkit } from "@/toolkits/create-toolkit";
import { generateToolConfigClient } from "./tools/generate/client";
import { baseImageToolkitConfig } from "./base";
import { Button } from "@/components/ui/button";
import { ModelProviderIcon } from "@/components/ui/model-icon";
import { HStack } from "@/components/ui/stack";
import { ToolkitGroups } from "@/toolkits/types";
import { allImageModels } from "@/ai/image";

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
      return (
        <div className="flex flex-col gap-2">
          {allImageModels.map((model) => (
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
    type: ToolkitGroups.Native,
  },
  {
    [ImageTools.Generate]: generateToolConfigClient,
  },
);
