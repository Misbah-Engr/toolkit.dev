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
          <div className="flex items-center gap-2 px-1">
            <Logo className="size-6" />
            <h1 className="overflow-hidden text-2xl font-bold whitespace-nowrap group-data-[collapsible=icon]:hidden">
              Open Chat
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <NavMain />
          {session?.user.id && <NavChats />}
        </SidebarContent>
        <SidebarFooter />
        <SidebarRail />
      </Sidebar>
    </HydrateClient>
  );
}
