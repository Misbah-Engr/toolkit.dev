import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const baseRunCodeTool = createBaseTool({
  description: "Run Python code in a secure sandbox environment using E2B. Supports Jupyter Notebook syntax and returns execution results and logs.",
  inputSchema: z.object({
    code: z.string().describe("The Python code to execute in the sandbox"),
  }),
  outputSchema: z.object({
    results: z.array(z.any()).describe("The execution results from running the code"),
    logs: z.object({
      stdout: z.array(z.string()).describe("Standard output logs"),
      stderr: z.array(z.string()).describe("Standard error logs"),
    }).describe("Execution logs"),
  }),
});