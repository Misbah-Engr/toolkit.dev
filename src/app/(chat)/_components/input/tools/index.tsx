import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Plus, Settings, Wrench, X, Info } from "lucide-react";
import { useChatContext } from "@/app/(chat)/_contexts/chat-context";
import { HStack } from "@/components/ui/stack";
import { clientToolkits } from "@/mcp/servers/client";
import type { ClientToolkit } from "@/mcp/types";
import { useState } from "react";
import type z from "zod";
import type { Servers, ServerToolParameters } from "@/mcp/servers/shared";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

export const ToolsSelect = () => {
  const { toolkits, addToolkit, removeToolkit } = useChatContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedToolkit, setSelectedToolkit] = useState<string | null>(null);

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-transparent">
            {toolkits.length > 0 ? (
              <div className="flex items-center">
                {toolkits.map((toolkit) => (
                  <div
                    className="bg-card -ml-2 rounded-full border p-1"
                    key={toolkit.id}
                  >
                    <toolkit.toolkit.icon className="size-4" />
                  </div>
                ))}
              </div>
            ) : (
              <Wrench />
            )}
            <span>
              {toolkits.length > 0
                ? `${toolkits.length} Tool${toolkits.length > 1 ? "s" : ""}`
                : "Add Tools"}
            </span>
          </Button>
        </DialogTrigger>

        <DialogContent className="flex max-h-[80vh] max-w-2xl flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle>Manage Toolkits</DialogTitle>
            <DialogDescription>
              Add or remove tools to enhance your chat experience
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-4">
              {Object.entries(clientToolkits).map(([id, toolkit]) => {
                const isSelected = toolkits.some((t) => t.id === id);
                const needsConfiguration =
                  Object.keys(toolkit.parameters.shape).length > 0;
                const isExpanded = selectedToolkit === id;

                return (
                  <div
                    key={id}
                    className="space-y-2 border-b pb-2 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col">
                        <HStack className="gap-3">
                          <toolkit.icon className="size-4" />
                          <h3 className="font-medium">{toolkit.name}</h3>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="text-muted-foreground size-4 cursor-pointer" />
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
                        <p className="text-muted-foreground text-sm">
                          {toolkit.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {isSelected ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeToolkit(id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <X className="size-4" />
                            Remove
                          </Button>
                        ) : needsConfiguration ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setSelectedToolkit(isExpanded ? null : id)
                            }
                          >
                            <Settings className="size-4" />
                            Configure
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              addToolkit(id, toolkit as ClientToolkit, {})
                            }
                          >
                            <Plus className="size-4" />
                            Add
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Configuration form */}
                    {isExpanded && needsConfiguration && (
                      <>
                        <Separator />
                        <ClientToolkitConfigure
                          toolkit={toolkit as ClientToolkit}
                          id={id as Servers}
                          schema={toolkit.parameters}
                          onAdd={() => {
                            setSelectedToolkit(null);
                            setIsOpen(false);
                          }}
                        />
                      </>
                    )}
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
  onAdd: () => void;
}> = ({ toolkit, id, schema, onAdd }) => {
  const { addToolkit } = useChatContext();

  const [parameters, setParameters] = useState<ServerToolParameters[typeof id]>(
    {} as ServerToolParameters[typeof id],
  );

  const handleSubmit = () => {
    addToolkit(id, toolkit, parameters);
    onAdd();
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 font-medium">Configuration</h4>
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
