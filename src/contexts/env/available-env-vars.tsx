"use client";

import type { ClientToolkit, EnvVarGroupAll } from "@/toolkits/types";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface AvailableEnvVarsContextType {
  envVars: Record<string, boolean>;
  updateEnvVars: (envVars: Record<string, boolean>) => void;
}

const AvailableEnvVarsContext =
  createContext<AvailableEnvVarsContextType | null>(null);

export function AvailableEnvVarsProvider({
  children,
  initialEnvVars,
}: {
  children: ReactNode;
  initialEnvVars: Record<string, boolean>;
}) {
  const [envVars, setEnvVars] =
    useState<Record<string, boolean>>(initialEnvVars);

  const updateEnvVars = (envVars: Record<string, boolean>) => {
    setEnvVars((prev) => ({ ...prev, ...envVars }));
  };

  useEffect(() => {
    setEnvVars(initialEnvVars);
  }, [initialEnvVars]);

  return (
    <AvailableEnvVarsContext.Provider value={{ envVars, updateEnvVars }}>
      {children}
    </AvailableEnvVarsContext.Provider>
  );
}

export const useUpdateEnvVars = () => {
  const context = useContext(AvailableEnvVarsContext);
  if (!context) {
    return () => {
      void 0;
    };
  }
  return context.updateEnvVars;
};

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
