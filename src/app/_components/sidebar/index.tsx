import * as React from "react";

import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavMain } from "./main";
import { NavChats } from "./chats";
import { NavUser } from "./user";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { HStack, VStack } from "@/components/ui/stack";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { WorkbenchSelect } from "./workbench-select";
import { getCurrentPath } from "@/lib/current-path";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [session, currentPath] = await Promise.all([auth(), getCurrentPath()]);

  if (!session || currentPath === "/onboarding") {
    return null;
  }

  const workbenchId =
    currentPath.split("/")[2] === "new" ? undefined : currentPath.split("/")[2];

  if (session?.user) {
    void api.chats.getChats.prefetchInfinite({
      limit: 10,
      workbenchId,
    });
    void api.workbenches.getWorkbenches.prefetchInfinite({
      limit: 10,
    });
  }

  return (
    <HydrateClient>
      <Sidebar collapsible="icon" className="sidebar-glow relative" {...props}>
        <SidebarHeader className="border-b border-sidebar-border p-3">
          <Link href="/" className="rounded-lg p-2 transition-colors hover:bg-sidebar-accent/50">
            <HStack className="items-center">
              <Logo className="size-6" />
              <h1 className="shimmer-text overflow-hidden text-xl font-bold whitespace-nowrap group-data-[collapsible=icon]:hidden">
                Toolkit.dev
              </h1>
            </HStack>
          </Link>
          <div className="mt-2">
            <WorkbenchSelect />
          </div>
        </SidebarHeader>
        <SidebarContent className="gap-0 pt-2">
          <NavMain />
          <NavChats />
        </SidebarContent>
        <SidebarFooter className="flex flex-col gap-2 p-3">
          <NavUser
            user={{
              name: session.user.name ?? "User",
              email: session.user.email ?? "",
              avatar: session.user.image ?? "",
            }}
          />
          <SidebarMenuButton asChild className="blue-outline h-fit w-full rounded-lg p-3 transition-colors hover:bg-sidebar-accent/50">
            <Link
              href="https://github.com/jasonhedman/open-chat"
              target="_blank"
              className="flex items-center gap-3"
            >
              <SiGithub className="size-6 text-sidebar-accent-foreground" />
              <VStack className="items-start gap-0 group-data-[collapsible=icon]:hidden">
                <h3 className="shimmer-text font-medium text-sidebar-foreground">Contribute</h3>
                <p className="text-xs text-sidebar-muted-foreground">
                  Join the toolkit developers!
                </p>
              </VStack>
            </Link>
          </SidebarMenuButton>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </HydrateClient>
  );
}
