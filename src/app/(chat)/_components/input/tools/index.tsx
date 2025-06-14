import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Plus, Wrench } from "lucide-react";
import { useChatContext } from "@/app/(chat)/_contexts/chat-context";
import { HStack } from "@/components/ui/stack";
import { clientToolkits } from "@/mcp/servers/client-toolkits";

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
                  addToolkit(id, toolkit, {});
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
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
