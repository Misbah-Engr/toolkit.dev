import { execSync } from "child_process";

import { logSuccess, logError, getProjectRoot } from "../utils";
import { existsSync } from "fs";
import { join } from "path";

export function runCodeGeneration(): void {
  try {
    // Check if docker-compose.yml exists
    const projectRoot = getProjectRoot();
    const codegenPath = join(projectRoot, "src/components/ui/code/codegen.ts");

    if (!existsSync(codegenPath)) {
      logError("codegen.ts not found in project root");
      throw new Error("codegen.ts not found");
    }
    execSync(`pnpm dlx tsx ${codegenPath}`, {
      //   stdio: "ignore",
    });
    logSuccess("Code generation completed successfully");
  } catch (error) {
    logError("Failed to run code generation");
    throw error;
  }
}
