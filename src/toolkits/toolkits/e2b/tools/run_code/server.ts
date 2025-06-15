// Note: This requires the @e2b/code-interpreter package to be installed
// Run: npm install @e2b/code-interpreter
// Also requires E2B_API_KEY environment variable to be set

import type { ServerToolConfig } from "@/toolkits/types";
import { type baseRunCodeTool } from "./base";

// Type definitions for E2B (to avoid any types)
interface E2BSandbox {
  create(): Promise<E2BSandboxInstance>;
}

interface E2BSandboxInstance {
  runCode(code: string): Promise<{ results: unknown[]; logs: { stdout: string[]; stderr: string[] } }>;
  close(): Promise<void>;
}

interface E2BModule {
  Sandbox: E2BSandbox;
}

export const e2bRunCodeToolConfigServer = (): ServerToolConfig<
  typeof baseRunCodeTool.inputSchema.shape,
  typeof baseRunCodeTool.outputSchema.shape
> => ({
  callback: async ({ code }) => {
    // Check for E2B API key
    if (!process.env.E2B_API_KEY) {
      throw new Error("E2B_API_KEY environment variable is required but not set");
    }

    try {
      // Dynamic import to handle missing package gracefully
      const e2bModule = await import("@e2b/code-interpreter").catch(() => {
        throw new Error("@e2b/code-interpreter package is not installed. Run: npm install @e2b/code-interpreter");
      }) as E2BModule;
      
      const sandbox = await e2bModule.Sandbox.create();
      const { results, logs } = await sandbox.runCode(code);
      
      await sandbox.close();

      return {
        results: results || [],
        logs: logs || { stdout: [], stderr: [] },
      };
    } catch (error) {
      console.error("Error running code in E2B sandbox:", error);
      throw new Error(`Failed to execute code: ${error instanceof Error ? error.message : String(error)}`);
    }
  },
  message: (result) => {
    const hasResults = result.results && result.results.length > 0;
    const hasLogs = result.logs.stdout.length > 0 || result.logs.stderr.length > 0;
    
    if (hasResults && hasLogs) {
      return "Code executed successfully with results and logs.";
    } else if (hasResults) {
      return "Code executed successfully with results.";
    } else if (hasLogs) {
      return "Code executed successfully with logs.";
    } else {
      return "Code executed successfully.";
    }
  },
});