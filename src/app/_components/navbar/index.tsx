import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

import { AccountButton } from "./account-button";
import { ColorModeToggle } from "./color-mode-toggle";
import { HStack } from "@/components/ui/stack";
import { auth } from "@/server/auth";

export const Navbar = async () => {
  const session = await auth();

  if (!session) {
    return null;
  }

  return (
    <HStack className="bg-background sticky top-0 z-10 justify-between p-2 md:hidden">
      <HStack>
        <SidebarTrigger className="p-2 hover:bg-accent/50 rounded-lg mr-2">
          <Menu size={20}/>
        </SidebarTrigger>   
      </HStack>
      <HStack>
        <AccountButton />
        <ColorModeToggle />
      </HStack>
    </HStack>
  );
};