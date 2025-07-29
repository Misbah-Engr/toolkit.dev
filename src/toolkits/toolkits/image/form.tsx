"use client";

import React, { useState } from "react";

import type { z, ZodObject } from "zod";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { HStack } from "@/components/ui/stack";
import { ModelProviderIcon } from "@/components/ui/model-icon";

import { EnvVarDialog } from "@/components/env-vars/env-var-dialog";

import { allImageModels } from "@/ai/image";
import { imageKeyMap } from "@/ai/image/key-map";

import { useEnvVarAvailable } from "@/contexts/env/available-env-vars";

import { imageEnvVarMap } from "./env-vars";

import { cn } from "@/lib/utils";
import { IS_PRODUCTION } from "@/lib/constants";

import type { imageParameters } from "./base";
import type { ImageModel } from "@/ai/image/types";

const imageModelHeight = 48;

export const Form: React.ComponentType<{
  parameters: z.infer<ZodObject<typeof imageParameters.shape>>;
  setParameters: (
    parameters: z.infer<ZodObject<typeof imageParameters.shape>>,
  ) => void;
}> = ({ parameters, setParameters }) => {
  return (
    <Command className="bg-transparent">
      <CommandInput placeholder="Search models..." />
      <CommandList
        style={{ maxHeight: `${imageModelHeight * 4.5}px` }}
        gradientClassName="from-background"
      >
        <CommandEmpty>No models found.</CommandEmpty>
        <CommandGroup className="p-0">
          {allImageModels.map((model) => {
            const modelValue = `${model.provider}:${model.modelId}`;
            const isSelected = parameters.model === modelValue;

            return IS_PRODUCTION ? (
              <ImageModelItem
                key={model.modelId}
                model={model}
                isSelected={isSelected}
                onSelect={() => {
                  setParameters({
                    model: modelValue as typeof parameters.model,
                  });
                }}
              />
            ) : (
              <DevImageModelItem
                key={model.modelId}
                model={model}
                isSelected={isSelected}
                onSelect={() => {
                  setParameters({
                    model: modelValue as typeof parameters.model,
                  });
                }}
              />
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

interface ImageModelItemProps {
  model: ImageModel;
  isSelected: boolean;
  onSelect: () => void;
}

const ImageModelItem = ({
  model,
  isSelected,
  onSelect,
}: ImageModelItemProps) => {
  return (
    <CommandItem
      key={model.modelId}
      value={`${model.name} ${model.modelId} ${model.provider}`}
      onSelect={onSelect}
      className={cn(
        "data-[selected=true]:bg-primary/10 cursor-pointer rounded-none transition-colors",
        isSelected && "bg-primary/20 data-[selected=true]:bg-primary/20",
      )}
      style={{ height: `${imageModelHeight}px` }}
    >
      <HStack className="flex-1">
        <ModelProviderIcon provider={model.provider} />
        <div className="flex flex-col">
          <p className={cn("text-sm", isSelected && "text-primary")}>
            {model.name}
          </p>
          <p className="text-xs opacity-60">{model.modelId}</p>
        </div>
      </HStack>
    </CommandItem>
  );
};

const DevImageModelItem = ({
  model,
  isSelected,
  onSelect,
}: ImageModelItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasEnvVar = useEnvVarAvailable([imageKeyMap[model.provider]]);

  const envVar = imageEnvVarMap[model.provider];

  return (
    <>
      <ImageModelItem
        model={model}
        isSelected={isSelected}
        onSelect={!hasEnvVar ? () => setIsOpen(true) : onSelect}
      />
      <EnvVarDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        resourceName={`the ${model.name} model`}
        envVars={[
          {
            type: "all",
            keys: [envVar.key],
            description: envVar.description,
          },
        ]}
        onSuccess={onSelect}
      />
    </>
  );
};
