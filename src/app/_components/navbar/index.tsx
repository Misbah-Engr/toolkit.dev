import { Logo } from "@/components/ui/logo";

import { AccountButton } from "./account-button";
import { ColorModeToggle } from "./color-mode-toggle";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-2 md:hidden">
      <div className="flex items-center gap-2">
        <Logo className="size-6" />
        <h1 className="overflow-hidden text-2xl font-bold whitespace-nowrap">
          Open Chat
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <AccountButton />
        <ColorModeToggle />
      </div>
    </div>
  );
};
