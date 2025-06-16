import Link from "next/link";

import { Edit, Settings } from "lucide-react";

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
    title: "Workbenches",
    url: "/workbenches",
    icon: Settings,
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
