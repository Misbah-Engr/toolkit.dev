import React, { useEffect, useMemo, useState } from "react";

import { Info } from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HStack } from "@/components/ui/stack";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { ClientToolkitConfigure } from "@/components/toolkit/toolkit-configure";

import { clientToolkits } from "@/toolkits/toolkits/client";

import { cn } from "@/lib/utils";

import type { ClientToolkit } from "@/toolkits/types";
import type { Toolkits } from "@/toolkits/toolkits/shared";
import type { SelectedToolkit } from "./types";

interface ToolkitListProps {
  selectedToolkits: SelectedToolkit[];
  onAddToolkit: (toolkit: SelectedToolkit) => void;
  onRemoveToolkit: (id: Toolkits) => void;
}

const toolkitItemHeight = 48;
const numToolkitsToShow = 5;

export const ToolkitList: React.FC<ToolkitListProps> = ({
  selectedToolkits,
  onAddToolkit,
  onRemoveToolkit,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [configureDialogOpen, setConfigureDialogOpen] = useState(false);
  const [selectedToolkitForConfig, setSelectedToolkitForConfig] = useState<{
    id: Toolkits;
    toolkit: ClientToolkit;
  } | null>(null);

  const filteredToolkits = useMemo(() => {
    return Object.entries(clientToolkits).filter(([, toolkit]) => {
      return (
        searchQuery.toLowerCase() === "" ||
        toolkit.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  useEffect(() => {
    const updatedToolkits = Object.entries(clientToolkits).filter(([id]) => {
      return (
        searchParams.get(id) === "true" &&
        !selectedToolkits.some((t) => t.id === (id as Toolkits))
      );
    });

    if (updatedToolkits.length > 0) {
      updatedToolkits.forEach(([id, toolkit]) => {
        onAddToolkit({
          id: id as Toolkits,
          parameters: {},
          toolkit: toolkit as ClientToolkit,
        });
      });
      window.history.replaceState({}, "", pathname);
    }
  }, [searchParams, onAddToolkit, selectedToolkits, router, pathname]);

  const handleToolkitAction = (id: Toolkits, toolkit: ClientToolkit) => {
    const isSelected = selectedToolkits.some((t) => t.id === id);
    const needsConfiguration = Object.keys(toolkit.parameters.shape).length > 0;

    if (isSelected) {
      onRemoveToolkit(id);
    } else if (needsConfiguration) {
      setSelectedToolkitForConfig({ id, toolkit });
      setConfigureDialogOpen(true);
    } else {
      onAddToolkit({ id, toolkit, parameters: {} });
    }
  };

  const handleConfigureSubmit = (parameters: Record<string, unknown>) => {
    if (selectedToolkitForConfig) {
      onAddToolkit({
        id: selectedToolkitForConfig.id,
        toolkit: selectedToolkitForConfig.toolkit,
        parameters,
      });
      setConfigureDialogOpen(false);
      setSelectedToolkitForConfig(null);
    }
  };

  return (
    <div className="overflow-hidden">
      <TooltipProvider>
        <div className="flex h-full max-h-full flex-col gap-2 overflow-hidden">
          <Command className="bg-transparent">
            <CommandInput
              placeholder="Search toolkits..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList
              style={{
                height: `${toolkitItemHeight * (numToolkitsToShow + 0.5)}px`,
              }}
            >
              <CommandEmpty>No toolkits match your search</CommandEmpty>
              <CommandGroup className="p-0">
                {filteredToolkits.map(([id, toolkit]) => {
                  const isSelected = selectedToolkits.some(
                    (t) => t.id === (id as Toolkits),
                  );

                  return (
                    <CommandItem
                      key={id}
                      onSelect={() =>
                        handleToolkitAction(
                          id as Toolkits,
                          toolkit as ClientToolkit,
                        )
                      }
                      className="flex items-center justify-between gap-4 rounded-none px-3"
                    >
                      <div className="flex flex-1 flex-col">
                        <HStack>
                          <toolkit.icon
                            className={cn(
                              "size-4",
                              isSelected && "text-primary",
                            )}
                          />
                          <h3 className="text-sm font-medium">
                            {toolkit.name}
                          </h3>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="text-muted-foreground size-3 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent side="right" className="max-w-64">
                              <div className="space-y-2">
                                <p className="text-sm font-medium">
                                  Available Tools
                                </p>
                                <ul className="space-y-1">
                                  {Object.entries(toolkit.tools).map(
                                    ([name, tool]) => (
                                      <li
                                        key={name}
                                        className="flex items-start gap-2"
                                      >
                                        <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current" />
                                        <p className="text-xs">
                                          {tool.description}
                                        </p>
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
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </TooltipProvider>

      <Dialog open={configureDialogOpen} onOpenChange={setConfigureDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Configure {selectedToolkitForConfig?.toolkit.name}
            </DialogTitle>
          </DialogHeader>
          {selectedToolkitForConfig && (
            <ClientToolkitConfigure
              toolkit={selectedToolkitForConfig.toolkit}
              id={selectedToolkitForConfig.id}
              schema={selectedToolkitForConfig.toolkit.parameters}
              onAdd={handleConfigureSubmit}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
