import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus, Info } from "lucide-react";
import { HStack } from "@/components/ui/stack";
import { clientToolkits } from "@/toolkits/toolkits/client";
import type { ClientToolkit } from "@/toolkits/types";
import type { Servers } from "@/toolkits/toolkits/shared";
import { ClientToolkitConfigure } from "@/components/toolkit/toolkit-configure";
import type { SelectedToolkit } from "./types";

interface ToolkitListProps {
  selectedToolkits: SelectedToolkit[];
  onAddToolkit: (toolkit: SelectedToolkit) => void;
  onRemoveToolkit: (id: string) => void;
}

export const ToolkitList: React.FC<ToolkitListProps> = ({
  selectedToolkits,
  onAddToolkit,
  onRemoveToolkit,
}) => {
  const addToolkitButtons = (
    id: Servers,
    toolkit: ClientToolkit,
    isSelected: boolean,
    needsConfiguration: boolean,
  ) =>
    isSelected ? (
      <Button
        variant="primaryOutline"
        size="sm"
        onClick={() => onRemoveToolkit(id)}
      >
        Active
      </Button>
    ) : needsConfiguration ? (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <Plus className="size-4" />
            Add
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <ClientToolkitConfigure
            toolkit={toolkit}
            id={id}
            schema={toolkit.parameters}
            onAdd={onAddToolkit}
          />
        </PopoverContent>
      </Popover>
    ) : (
      <Button
        variant="outline"
        size="sm"
        onClick={() => onAddToolkit({ id, toolkit, parameters: {} })}
      >
        <Plus className="size-4" />
        Add
      </Button>
    );

  return (
    <TooltipProvider>
      <div>
        {Object.entries(clientToolkits).map(([id, toolkit]) => {
          const isSelected = selectedToolkits.some((t) => t.id === id);
          const needsConfiguration =
            Object.keys(toolkit.parameters.shape).length > 0;

          return (
            <div
              key={id}
              className="border-border/50 border-b py-2 first:pt-0 last:border-b-0 last:pb-0"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-1 flex-col">
                  <HStack className="gap-3">
                    <toolkit.icon className="size-4" />
                    <h3 className="font-medium">{toolkit.name}</h3>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="text-muted-foreground size-4 cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-64">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Available Tools</p>
                          <ul className="space-y-1">
                            {Object.entries(toolkit.tools).map(
                              ([name, tool]) => (
                                <li
                                  key={name}
                                  className="flex items-start gap-2"
                                >
                                  <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current" />
                                  <p className="text-xs">{tool.description}</p>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </HStack>
                  <p className="text-muted-foreground text-xs">
                    {toolkit.description}
                  </p>
                </div>

                <div className="flex w-28 justify-end gap-2">
                  {toolkit.addToolkitWrapper ? (
                    <toolkit.addToolkitWrapper>
                      {addToolkitButtons(
                        id as Servers,
                        toolkit as ClientToolkit,
                        isSelected,
                        needsConfiguration,
                      )}
                    </toolkit.addToolkitWrapper>
                  ) : (
                    addToolkitButtons(
                      id as Servers,
                      toolkit as ClientToolkit,
                      isSelected,
                      needsConfiguration,
                    )
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
};
