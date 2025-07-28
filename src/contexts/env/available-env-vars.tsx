"use client";

import type { ClientToolkit } from "@/toolkits/types";
import { createContext, useContext, type ReactNode } from "react";

const AvailableEnvVarsContext = createContext<Record<string, boolean> | null>(
  null,
);

export function AvailableEnvVarsProvider({
  children,
  envVars,
}: {
  children: ReactNode;
  envVars: Record<string, boolean>;
}) {
  return (
    <AvailableEnvVarsContext.Provider value={envVars}>
      {children}
    </AvailableEnvVarsContext.Provider>
  );
}

export const useSomeEnvVarsAvailable = (envVars: string[]) => {
  const context = useContext(AvailableEnvVarsContext);
  if (!context) {
    return true;
  }
  return envVars.some((envVar) => context[envVar]);
};

export const useToolkitEnvVarsAvailable = (toolkit: ClientToolkit) => {
  const context = useContext(AvailableEnvVarsContext);
  if (!context) {
    return true;
  }
  return toolkit.envVars.every((envVar) =>
    Array.isArray(envVar)
      ? envVar.some((envVar) => context[envVar])
      : context[envVar],
  );
};
