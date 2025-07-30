import { env } from "@/env";

import { AvailableEnvVarsProvider } from "./available-env-vars";

import { IS_DEVELOPMENT } from "@/lib/constants";

export const EnvProvider = ({ children }: { children: React.ReactNode }) => {
  if (!IS_DEVELOPMENT) {
    return children;
  }

  return (
    <AvailableEnvVarsProvider
      envVars={Object.fromEntries(
        Object.entries(env).map(([key, value]) => [key, Boolean(value)]),
      )}
    >
      {children}
    </AvailableEnvVarsProvider>
  );
};
