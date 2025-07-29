"use client";

import { createContext, useContext, type ReactNode } from "react";

import { useSearchParams } from "next/navigation";

import type { ClientToolkit, EnvVarGroupAll } from "@/toolkits/types";

interface AvailableEnvVarsContextType {
  envVars: Record<string, boolean>;
}

const AvailableEnvVarsContext =
  createContext<AvailableEnvVarsContextType | null>(null);

export function AvailableEnvVarsProvider({
  children,
  envVars,
}: {
  children: ReactNode;
  envVars: Record<string, boolean>;
}) {
  const searchParams = useSearchParams();
  const openRouterKeySet = searchParams.has("or-key-updated");

  return (
    <AvailableEnvVarsContext.Provider
      value={{
        envVars: {
          ...envVars,
          ...(openRouterKeySet ? { OPENROUTER_API_KEY: true } : {}),
        },
      }}
    >
      {children}
    </AvailableEnvVarsContext.Provider>
  );
}

export const useEnvVarAvailable = (envVar: string) => {
  const context = useContext(AvailableEnvVarsContext);
  if (!context) {
    return true;
  }
  return Boolean(context.envVars[envVar]);
};

export const useToolkitMissingEnvVars = (toolkit: ClientToolkit) => {
  const context = useContext(AvailableEnvVarsContext);
  if (!context) {
    return [];
  }
  return toolkit.envVars
    .map((envVar) => {
      if (envVar.type === "all") {
        const missingKeys = envVar.keys.filter((key) => !context.envVars[key]);
        if (missingKeys.length === 0) {
          return null;
        }
        return {
          type: "all",
          keys: missingKeys,
          description: envVar.description,
        } as EnvVarGroupAll;
      } else if (envVar.type === "any") {
        if (envVar.keys.some((key) => context.envVars[key.key])) {
          return null;
        }
        return envVar;
      }
      return null;
    })
    .filter((envVar) => envVar !== null);
};
