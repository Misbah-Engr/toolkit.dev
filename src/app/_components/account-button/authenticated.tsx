"use client";

import { LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { Session } from "next-auth";

interface Props {
  session: Session;
}

export const Authenticated: React.FC<Props> = ({ session }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {session.user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={session.user.image}
              alt={session.user.name ?? ""}
              className="size-4 rounded-full"
            />
          ) : (
            <User className="size-4" />
          )}
          {session.user.name ?? "Signed In"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Button variant="outline">
          <LogOut />
          Sign Out
        </Button>
      </PopoverContent>
    </Popover>
  );
};
