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
import { clientConfigs } from "@/mcp/servers/client";
import { useChatContext } from "@/app/(chat)/_contexts/chat-context";
import { HStack } from "@/components/ui/stack";

export const ToolsSelect = () => {
  const { mcpServers, addMcpServer, removeMcpServer } = useChatContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-transparent">
          <Wrench />
          <span>Tools</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="start">
        {Object.values(clientConfigs).map((server) => (
          <DropdownMenuSub key={server.id}>
            <DropdownMenuSubTrigger
              onClick={(e) => {
                e.preventDefault();
                if (mcpServers.some((s) => s.id === server.id)) {
                  removeMcpServer(server);
                } else {
                  addMcpServer(server);
                }
              }}
              className="flex items-center justify-between gap-2"
              hideChevron
            >
              <HStack className="gap-2">
                <server.icon className="size-4" />
                <p className="text-sm font-medium">{server.name}</p>
              </HStack>
              {mcpServers.some((s) => s.id === server.id) ? (
                <Check className="size-4" />
              ) : (
                <Plus className="size-4 opacity-20" />
              )}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              sideOffset={10}
              className="flex flex-col gap-1"
            >
              <div className="flex flex-col">
                <h1 className="text-lg font-medium">{server.name}</h1>
                <p className="text-muted-foreground text-sm">
                  {server.description}
                </p>
              </div>
              <ul className="flex flex-col gap-2 pl-4">
                {Object.entries(server.tools).map(([name, tool]) => (
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
