import { env } from "@/env";

import { AvailableEnvVarsProvider } from "./available-env-vars";

import { IS_PRODUCTION } from "@/lib/constants";

export const EnvProvider = ({ children }: { children: React.ReactNode }) => {
  if (IS_PRODUCTION) {
    return children;
  }

  return (
    <AvailableEnvVarsProvider
      envVars={Object.fromEntries(Object.keys(env).map((key) => [key, true]))}
    >
      {children}
    </AvailableEnvVarsProvider>
  );
};
