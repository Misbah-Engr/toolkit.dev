import Link from "next/link";

import { Anvil, Edit, Settings } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "New Chat",
    url: "/",
    icon: Edit,
  },
  {
    title: "New Workbench",
    url: "/workbench/new",
    icon: Anvil,
  },
];

export const NavMain = () => {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuButton key={item.title} tooltip={item.title} asChild>
            <Link href={item.url}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
