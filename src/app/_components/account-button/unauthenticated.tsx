"use client";

import { User } from "lucide-react";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ProviderIcon } from "./provider-icon";

interface Props {
  providers: {
    name: string;
    id: string;
  }[];
}

export const Unauthenticated: React.FC<Props> = ({ providers }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full cursor-pointer">
          <User />
          Sign In
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {providers.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            className="w-full cursor-pointer"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            <ProviderIcon provider={provider.name} />
            Sign In with {provider.name}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
