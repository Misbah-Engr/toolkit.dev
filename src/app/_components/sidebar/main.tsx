import Link from "next/link";

import { Code, Edit, Home } from "lucide-react";

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
    title: "Source Code",
    url: "https://github.com/jasonhedman/open-chat",
    icon: Code,
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
