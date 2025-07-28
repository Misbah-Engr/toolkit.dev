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

import { allImageModels } from "@/ai/image";

import { cn } from "@/lib/utils";

import type { imageParameters } from "./base";

const imageModelHeight = 48;

export const Form: React.ComponentType<{
  parameters: z.infer<ZodObject<typeof imageParameters.shape>>;
  setParameters: (
    parameters: z.infer<ZodObject<typeof imageParameters.shape>>,
  ) => void;
}> = ({ parameters, setParameters }) => {
  console.log(parameters);
  return (
    <Command className="bg-transparent">
      <CommandInput placeholder="Search models..." />
      <CommandList style={{ height: `${imageModelHeight * 4.5}px` }}>
        <CommandEmpty>No models found.</CommandEmpty>
        <CommandGroup className="p-0">
          {allImageModels.map((model) => {
            const modelValue = `${model.provider}:${model.modelId}`;
            const isSelected = parameters.model === modelValue;

            return (
              <CommandItem
                key={model.modelId}
                value={`${model.name} ${model.modelId} ${model.provider}`}
                onSelect={() => {
                  setParameters({
                    model: modelValue as typeof parameters.model,
                  });
                }}
                className={cn(
                  "cursor-pointer rounded-none",
                  isSelected && "bg-primary/10",
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
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
