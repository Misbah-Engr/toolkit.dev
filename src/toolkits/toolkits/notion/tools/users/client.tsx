import React from "react";
import type { ClientToolConfig } from "@/toolkits/types";
import type { listUsersTool } from "./base";
import { HStack, VStack } from "@/components/ui/stack";
import { Users, User, Bot, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ToolCallDisplay } from "../../components";

export const notionListUsersToolConfigClient: ClientToolConfig<
  typeof listUsersTool.inputSchema.shape,
  typeof listUsersTool.outputSchema.shape
> = {
  CallComponent: () => {
    return (
      <ToolCallDisplay
        icon={Users}
        label="List Users"
        value="Fetching workspace users..."
      />
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
              <div className="size-6 shrink-0 overflow-hidden">
                {user.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.avatar_url}
                    alt={user.name ?? "User avatar"}
                    className="size-full rounded-full object-cover"
                  />
                ) : user.type === "bot" ? (
                  <Bot className="size-full" />
                ) : (
                  <User className="size-full" />
                )}
              </div>

              <VStack className="flex w-full items-start gap-0">
                <HStack className="items-center gap-2">
                  <h3 className="font-medium">
                    {user.name ?? `User ${index + 1}`}
                  </h3>
                  <Badge
                    variant={user.type === "bot" ? "secondary" : "primary"}
                    className="py-0 text-xs"
                  >
                    {user.type?.[0]?.toUpperCase() + user.type?.slice(1)}
                  </Badge>
                </HStack>

                {user.type === "person" && user.person?.email && (
                  <HStack className="text-muted-foreground/80 items-center gap-1">
                    <Mail className="size-3" />
                    <span className="text-xs">{user.person?.email}</span>
                  </HStack>
                )}

                {user.type === "bot" &&
                  "bot" in user &&
                  user.bot?.workspace_name && (
                    <p className="text-muted-foreground/60 text-xs">
                      Workspace: {user.bot.workspace_name}
                    </p>
                  )}
              </VStack>
            </HStack>
          ))}
        </div>
        {result.has_more && (
          <p className="text-muted-foreground mt-2 text-xs">
            More users available...
          </p>
        )}
      </div>
    );
  },
};
