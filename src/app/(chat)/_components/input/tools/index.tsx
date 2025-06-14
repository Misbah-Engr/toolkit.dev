import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Plus, Settings, Wrench } from "lucide-react";
import { useChatContext } from "@/app/(chat)/_contexts/chat-context";
import { HStack } from "@/components/ui/stack";
import { clientToolkits } from "@/mcp/servers/client";
import type { ClientToolkit } from "@/mcp/types";
import { useState } from "react";
import type z from "zod";
import type { Servers, ServerToolParameters } from "@/mcp/servers/shared";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const ToolsSelect = () => {
  const { toolkits, addToolkit, removeToolkit } = useChatContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
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
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="start">
        {Object.entries(clientToolkits).map(([id, toolkit]) => (
          <DropdownMenuSub key={id}>
            <DropdownMenuSubTrigger
              onClick={(e) => {
                e.preventDefault();
                if (toolkits.some((t) => t.id === id)) {
                  removeToolkit(id);
                } else {
                  if (Object.keys(toolkit.parameters.shape).length === 0) {
                    addToolkit(id, toolkit as ClientToolkit, {});
                  }
                }
              }}
              className="flex items-center justify-between gap-2"
              hideChevron
            >
              <HStack className="gap-2">
                <toolkit.icon className="size-4" />
                <p className="text-sm font-medium">{toolkit.name}</p>
              </HStack>
              {toolkits.some((t) => t.id === id) ? (
                <Check className="size-4" />
              ) : (
                <Plus className="size-4 opacity-20" />
              )}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              sideOffset={10}
              alignOffset={100}
              className="flex max-w-48 flex-col gap-1 p-2 data-[side=right]:data-[align=center]:right-0"
            >
              <div className="flex flex-col">
                <h1 className="text-lg font-medium">{toolkit.name}</h1>
                <p className="text-muted-foreground text-sm">
                  {toolkit.description}
                </p>
              </div>
              <ul className="flex flex-col gap-2 pl-4">
                {Object.entries(toolkit.tools).map(([name, tool]) => (
                  <li key={name} className="list-disc">
                    <p className="text-muted-foreground text-xs">
                      {tool.description}
                    </p>
                  </li>
                ))}
              </ul>
              {Object.keys(toolkit.parameters.shape).length > 0 && (
                <ClientToolkitConfigure
                  toolkit={toolkit as ClientToolkit}
                  id={id as Servers}
                  schema={toolkit.parameters}
                />
              )}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ClientToolkitConfigure: React.FC<{
  toolkit: ClientToolkit;
  id: Servers;
  schema: z.ZodObject<z.ZodRawShape>;
}> = ({ toolkit, id, schema }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { addToolkit } = useChatContext();

  const [parameters, setParameters] = useState<ServerToolParameters[typeof id]>(
    {} as ServerToolParameters[typeof id],
  );

  const handleSubmit = () => {
    addToolkit(id, toolkit, parameters);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Settings />
          Configure
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configure {toolkit.name}</DialogTitle>
          <DialogDescription>
            Configure the parameters for {toolkit.name}
          </DialogDescription>
        </DialogHeader>
        {toolkit.form && (
          <toolkit.form parameters={parameters} setParameters={setParameters} />
        )}
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={!schema.safeParse(parameters).success}
            className="w-full"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
