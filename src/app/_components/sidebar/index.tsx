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
              <span className="text-primary">Toolkit</span>
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <NavMain />
          {session?.user.id && <NavChats />}
        </SidebarContent>
        <SidebarFooter className="flex flex-col gap-0">
          {session?.user && (
            <NavUser
              user={{
                name: session.user.name ?? "User",
                email: session.user.email ?? "",
                avatar: session.user.image ?? "",
              }}
            />
          )}
          <SidebarMenuButton asChild className="h-fit w-full">
            <Link
              href="https://github.com/jasonhedman/open-chat"
              target="_blank"
            >
              <HStack>
                <SiGithub className="size-8" />
                <VStack className="items-start gap-0">
                  <h3 className="text-primary font-bold">Contribute</h3>
                  <p className="text-[10px]">
                    Looking for more toolkit developers!
                  </p>
                </VStack>
              </HStack>
            </Link>
          </SidebarMenuButton>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </HydrateClient>
  );
}
