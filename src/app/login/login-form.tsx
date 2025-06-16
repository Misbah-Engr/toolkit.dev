"use client";

import { signIn } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AuthProviderIcon } from "@/app/_components/navbar/account-button/provider-icon";

interface LoginFormProps {
  providers: {
    name: string;
    id: string;
  }[];
}

export function LoginForm({
  providers,
  className,
  ...props
}: LoginFormProps & React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-primary text-xl">
            Welcome to Toolkit
          </CardTitle>
          <CardDescription>
            Sign in with your preferred account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              {providers.map((provider) => (
                <Button
                  key={provider.id}
                  variant="outline"
                  className="w-full"
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  <AuthProviderIcon provider={provider.name} />
                  Sign in with {provider.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
