import { Sandbox } from "@e2b/code-interpreter";
import type { ServerToolConfig } from "@/toolkits/types";
import { type baseRunCodeTool } from "./base";
import { env } from "@/env";

export const e2bRunCodeToolConfigServer = (): ServerToolConfig<
  typeof baseRunCodeTool.inputSchema.shape,
  typeof baseRunCodeTool.outputSchema.shape
> => ({
  callback: async ({ code }) => {
    // Check for E2B API key
    if (!env.E2B_API_KEY) {
      throw new Error(
        "E2B_API_KEY environment variable is required but not set",
      );
    }

    try {
      const sandbox = await Sandbox.create({
        apiKey: process.env.E2B_API_KEY,
      });
      const { results, logs } = await sandbox.runCode(code);
      await sandbox.kill();

      return {
        results: results,
        logs: logs,
      };
    } catch (error) {
      console.error("Error running code in E2B sandbox:", error);
      throw new Error(
        `Failed to execute code: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },
  message: (result) => {
    const hasResults = result.results && result.results.length > 0;
    const hasLogs =
      result.logs.stdout.length > 0 || result.logs.stderr.length > 0;

    if (hasResults && hasLogs) {
      return "Code executed successfully with results and logs. The user is shown the code and the results, so you do not have to reiterate them. If you ran code to answer a question, answer the users question given the results.";
    } else if (hasResults) {
      return "Code executed successfully with results. The user is shown the code and the results, so you do not have to reiterate them. If you ran code to answer a question, answer the users question given the results.";
    } else if (hasLogs) {
      return "Code executed successfully with logs. The user is shown the code and the logs, so you do not have to reiterate them. If you ran code to answer a question, answer the users question given the results.";
    } else {
      return "Code executed successfully. The user is shown the code, so you do not have to reiterate it. If you ran code to answer a question, answer the users question given the results.";
    }
  },
});
