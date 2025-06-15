import React from "react";
import type { ClientToolConfig } from "@/toolkits/types";
import type { listUsersTool } from "./base";
import { HStack, VStack } from "@/components/ui/stack";
import { Users, User, Bot, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const notionListUsersToolConfigClient: ClientToolConfig<
  typeof listUsersTool.inputSchema.shape,
  typeof listUsersTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <HStack className="gap-2">
        <Users className="text-muted-foreground size-4" />
        <VStack className="items-start gap-0">
          <span className="text-muted-foreground/80 text-xs font-medium">
            List Users
          </span>
          {args.page_size && (
            <span className="text-xs">Limit: {args.page_size}</span>
          )}
        </VStack>
      </HStack>
    );
  },
  ResultComponent: ({ result }) => {
    if (!result.results.length) {
      return <div className="text-muted-foreground">No users found</div>;
    }

    return (
      <div className="">
        <h1 className="text-muted-foreground text-sm font-medium">
          Workspace Users
        </h1>
        <div className="flex flex-col">
          {result.results.map((user, index) => (
            <HStack
              key={user.id}
              className="w-full items-center border-b py-2 last:border-b-0 last:pb-0"
            >
              <div className="size-8 shrink-0 flex items-center justify-center rounded-full bg-blue-100">
                {user.type === "bot" ? (
                  <Bot className="size-4 text-blue-600" />
                ) : (
                  <User className="size-4 text-blue-600" />
                )}
              </div>
              
              <VStack className="flex w-full items-start gap-1">
                <HStack className="items-center gap-2">
                  <h3 className="font-medium">
                    {user.name ?? `User ${index + 1}`}
                  </h3>
                  <Badge
                    variant={user.type === "bot" ? "secondary" : "primary"}
                    className="text-xs"
                  >
                    {user.type}
                  </Badge>
                </HStack>
                
                {user.person?.email && (
                  <HStack className="items-center gap-1 text-muted-foreground/80">
                    <Mail className="size-3" />
                    <span className="text-xs">{user.person.email}</span>
                  </HStack>
                )}
                
                {user.bot?.workspace_name && (
                  <p className="text-muted-foreground/60 text-xs">
                    Workspace: {user.bot.workspace_name}
                  </p>
                )}
                
                <p className="text-muted-foreground/40 text-xs">
                  ID: {user.id.slice(0, 8)}...
                </p>
              </VStack>
              
              {user.avatar_url && (
                <div className="size-6 shrink-0 overflow-hidden rounded-full bg-gray-200">
                  <img 
                    src={user.avatar_url} 
                    alt={user.name ?? "User avatar"}
                    className="size-full object-cover"
                  />
                </div>
              )}
            </HStack>
          ))}
        </div>
        {result.has_more && (
          <p className="text-muted-foreground text-xs mt-2">
            More users available...
          </p>
        )}
      </div>
    );
  },
};