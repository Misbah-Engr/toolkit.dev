import { useState } from "react";

import { Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CommandItem } from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VStack } from "@/components/ui/stack";

import { cn } from "@/lib/utils";

import type {
  ServerToolkitParameters,
  Toolkits,
} from "@/toolkits/toolkits/shared";
import type { ClientToolkit } from "@/toolkits/types";
import type { SelectedToolkit } from "../types";

interface Props {
  id: Toolkits;
  toolkit: ClientToolkit;
  isSelected: boolean;
  addToolkit: (toolkit: SelectedToolkit) => void;
  removeToolkit: (id: Toolkits) => void;
}

export const ToolkitItem: React.FC<Props> = ({
  id,
  toolkit,
  isSelected,
  addToolkit,
  removeToolkit,
}) => {
  const BaseItem = ({
    onSelect,
    isLoading,
  }: {
    onSelect: () => void;
    isLoading: boolean;
  }) => {
    return (
      <CommandItem
        onSelect={onSelect}
        className="flex items-center gap-2 rounded-none px-3"
        disabled={isLoading}
        value={toolkit.name}
      >
        <div
          className={cn(
            "rounded-full border p-1",
            isSelected && "border-primary text-primary",
          )}
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <toolkit.icon
              className={cn("size-4", isSelected && "text-primary")}
            />
          )}
        </div>

        <VStack className="flex flex-1 flex-col items-start gap-0">
          <h3 className="text-sm font-medium">{toolkit.name}</h3>
          <p className="text-muted-foreground text-xs">{toolkit.description}</p>
        </VStack>
      </CommandItem>
    );
  };

  const ItemWithForm = ({
    onSelect,
    isLoading,
  }: {
    onSelect?: () => void;
    isLoading: boolean;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [parameters, setParameters] = useState<
      ServerToolkitParameters[typeof id]
    >({} as ServerToolkitParameters[typeof id]);

    return (
      <>
        <BaseItem
          isLoading={isLoading}
          onSelect={onSelect ?? (() => setIsOpen(true))}
        />
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="gap-2 p-0 sm:max-w-[425px]">
            <DialogHeader className="p-4 pb-0">
              <DialogTitle>Configure {toolkit.name}</DialogTitle>
              <DialogDescription className="sr-only">
                Configure the {toolkit.name} toolkit
              </DialogDescription>
            </DialogHeader>
            {toolkit.form && (
              <toolkit.form
                parameters={parameters}
                setParameters={setParameters}
              />
            )}
            <DialogFooter className="flex justify-end gap-2 p-4">
              <Button variant="outline" onClick={close} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={() =>
                  addToolkit({
                    id,
                    toolkit,
                    parameters,
                  })
                }
                disabled={!toolkit.parameters.safeParse(parameters).success}
                className="flex-1"
              >
                <Plus className="size-4" />
                Enable
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const Item = ({
    isLoading,
    onSelect,
  }: {
    isLoading: boolean;
    onSelect?: () => void;
  }) => {
    if (Object.keys(toolkit.parameters.shape).length > 0 && !isSelected) {
      return <ItemWithForm isLoading={isLoading} onSelect={onSelect} />;
    }

    return (
      <BaseItem
        isLoading={isLoading}
        onSelect={
          onSelect ??
          (isSelected
            ? () => removeToolkit(id)
            : () => addToolkit({ id, toolkit, parameters: {} }))
        }
      />
    );
  };

  if (toolkit.Wrapper) {
    return <toolkit.Wrapper key={id} Item={Item} />;
  }

  return <Item key={id} isLoading={false} />;
};
