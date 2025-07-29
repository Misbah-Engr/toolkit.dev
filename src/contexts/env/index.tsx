import { env } from "@/env";

import { AvailableEnvVarsProvider } from "./available-env-vars";

import { IS_PRODUCTION } from "@/lib/constants";

export const EnvProvider = ({ children }: { children: React.ReactNode }) => {
  if (IS_PRODUCTION) {
    return children;
  }

  console.log(
    Object.fromEntries(
      Object.entries(env).map(([key, value]) => [key, Boolean(value)]),
    ),
  );

  return (
    <AvailableEnvVarsProvider
      initialEnvVars={Object.fromEntries(
        Object.entries(env).map(([key, value]) => [key, Boolean(value)]),
      )}
    >
      {children}
    </AvailableEnvVarsProvider>
  );
};
