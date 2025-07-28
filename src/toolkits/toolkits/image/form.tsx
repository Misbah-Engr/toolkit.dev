import type { z, ZodObject } from "zod";

import { CheckIcon } from "lucide-react";

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

import type { imageParameters } from "./base";
import { cn } from "@/lib/utils";

export const Form: React.ComponentType<{
  parameters: z.infer<ZodObject<typeof imageParameters.shape>>;
  setParameters: (
    parameters: z.infer<ZodObject<typeof imageParameters.shape>>,
  ) => void;
}> = ({ parameters, setParameters }) => {
  return (
    <Command>
      <CommandInput placeholder="Search models..." />
      <CommandList>
        <CommandEmpty>No models found.</CommandEmpty>
        <CommandGroup>
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
                className={cn(isSelected && "bg-primary/10")}
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
