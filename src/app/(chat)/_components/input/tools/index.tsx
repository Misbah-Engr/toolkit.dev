import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Plus, Settings, Wrench, Info } from "lucide-react";
import { useChatContext } from "@/app/(chat)/_contexts/chat-context";
import { HStack } from "@/components/ui/stack";
import { clientToolkits } from "@/toolkits/toolkits/client";
import type { ClientToolkit } from "@/toolkits/types";
import { useState } from "react";
import type z from "zod";
import type { Servers, ServerToolParameters } from "@/toolkits/toolkits/shared";

export const ToolsSelect = () => {
  const { toolkits, addToolkit, removeToolkit } = useChatContext();
  const [isOpen, setIsOpen] = useState(false);

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
        onClick={() => removeToolkit(id)}
      >
        Active
      </Button>
    ) : needsConfiguration ? (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <Settings className="size-4" />
            Configure
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <ClientToolkitConfigure
            toolkit={toolkit}
            id={id}
            schema={toolkit.parameters}
          />
        </PopoverContent>
      </Popover>
    ) : (
      <Button
        variant="outline"
        size="sm"
        onClick={() => addToolkit(id, toolkit, {})}
      >
        <Plus className="size-4" />
        Add
      </Button>
    );

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="bg-transparent">
            {toolkits.length > 0 ? (
              <div className="flex items-center">
                {toolkits.map((toolkit) => (
                  <div
                    className="bg-muted -ml-2 rounded-full border p-1"
                    key={toolkit.id}
                  >
                    <toolkit.toolkit.icon className="text-primary size-4" />
                  </div>
                ))}
              </div>
            ) : (
              <Wrench />
            )}
            <span>
              {toolkits.length > 0
                ? `${toolkits.length} Toolkit${toolkits.length > 1 ? "s" : ""}`
                : "Add Toolkits"}
            </span>
          </Button>
        </DialogTrigger>

        <DialogContent className="max-h-[80vh] max-w-2xl overflow-hidden">
          <DialogHeader>
            <DialogTitle>Manage Toolkits</DialogTitle>
            <DialogDescription>
              Add or remove tools to enhance your chat experience
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-y-auto">
            <div className="flex flex-col">
              {Object.entries(clientToolkits).map(([id, toolkit]) => {
                const isSelected = toolkits.some((t) => t.id === id);
                const needsConfiguration =
                  Object.keys(toolkit.parameters.shape).length > 0;

                return (
                  <div
                    key={id}
                    className="space-y-2 border-b py-2 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col">
                        <HStack className="gap-3">
                          <toolkit.icon className="size-4" />
                          <h3 className="font-medium">{toolkit.name}</h3>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="text-muted-foreground size-4 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent
                              side="right"
                              className="max-w-64"
                            >
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
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

const ClientToolkitConfigure: React.FC<{
  toolkit: ClientToolkit;
  id: Servers;
  schema: z.ZodObject<z.ZodRawShape>;
}> = ({ toolkit, id, schema }) => {
  const { addToolkit } = useChatContext();

  const [parameters, setParameters] = useState<ServerToolParameters[typeof id]>(
    {} as ServerToolParameters[typeof id],
  );

  const handleSubmit = () => {
    addToolkit(id, toolkit, parameters);
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium">{toolkit.name}</h4>
        <p className="text-muted-foreground text-sm">
          Configure {toolkit.name} parameters
        </p>
      </div>
      
      <div className="space-y-4">
        {toolkit.form && (
          <toolkit.form parameters={parameters} setParameters={setParameters} />
        )}
      </div>
      
      <Button
        onClick={handleSubmit}
        disabled={!schema.safeParse(parameters).success}
        className="w-full"
      >
        <Plus className="mr-2 size-4" />
        Add {toolkit.name}
      </Button>
    </div>
  );
};
