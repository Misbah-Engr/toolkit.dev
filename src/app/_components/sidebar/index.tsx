import * as React from "react";

import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavMain } from "./main";
import { NavChats } from "./chats";
import { NavUser } from "./user";
import { Logo } from "@/components/ui/logo";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const session = await auth();

  if (session?.user) {
    void api.chats.getChats.prefetchInfinite({
      limit: 10,
    });
  }

  return (
    <HydrateClient>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Logo className="size-6" />
            <h1 className="overflow-hidden text-xl font-bold whitespace-nowrap group-data-[collapsible=icon]:hidden">
              <span className="text-primary">Open</span>Chat
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <NavMain />
          {session?.user.id && <NavChats />}
        </SidebarContent>
        <SidebarFooter>
          {session?.user && (
            <NavUser
              user={{
                name: session.user.name ?? "User",
                email: session.user.email ?? "",
                avatar: session.user.image ?? "",
              }}
            />
          )}
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </HydrateClient>
  );
}
