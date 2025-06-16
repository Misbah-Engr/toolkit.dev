"use client";

import { User } from "lucide-react";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AuthProviderIcon } from "./provider-icon";

interface Props {
  providers: {
    name: string;
    id: string;
  }[];
}

export const Unauthenticated: React.FC<Props> = ({ providers }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <User />
          Sign In
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {providers.map((provider) => (
          <DropdownMenuItem
            key={provider.id}
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            <AuthProviderIcon provider={provider.name} />
            Sign In with {provider.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
