import { cn } from "@/lib/utils";
import { providers } from "@/server/auth/providers";

import { LoginForm } from "./login-form";

export default function LoginPage() {
  const mappedProviders = providers.map((provider) => ({
    name: provider.name,
    id: provider.id,
  }));

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <LoginForm providers={mappedProviders} />
      </div>
    </div>
  );
}