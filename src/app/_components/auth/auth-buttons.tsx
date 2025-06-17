"use client";

import { Button } from "@/components/ui/button";
import { AuthProviderIcon } from "../navbar/account-button/provider-icon";
import { signIn } from "next-auth/react";

interface AuthButtonsProps {
  providers: {
    name: string;
    id: string;
  }[];
}

export const AuthButtons = ({ providers }: AuthButtonsProps) => {
  return (
    <div className="flex flex-col gap-2">
      {providers.map((provider) => (
        <Button
          key={provider.id}
          variant="outline"
          className="w-full"
          onClick={() => signIn(provider.id, { callbackUrl: "/onboarding" })}
        >
          <AuthProviderIcon provider={provider.name} />
          Sign in with {provider.name}
        </Button>
      ))}
    </div>
  );
};
