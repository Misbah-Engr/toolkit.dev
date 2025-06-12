import Link from "next/link";

import { Code, Edit } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { SiGithub } from "@icons-pack/react-simple-icons";

const items = [
  {
    title: "New Chat",
    url: "/",
    icon: Edit,
  },
  {
    title: "Source Code",
    url: "https://github.com/jasonhedman/open-chat",
    icon: SiGithub,
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
