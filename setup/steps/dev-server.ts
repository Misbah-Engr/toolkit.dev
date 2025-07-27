import { execSync } from "child_process";

import { logStep, logInfo, logError } from "../utils";

// Start development server
export function startDevServer(): void {
  logStep("Development Server", "Starting the development server...");

  const startNow = process.argv.includes("--start");

  if (startNow) {
    try {
      logInfo("Starting development server...");
      execSync("pnpm dev", { stdio: "inherit" });
    } catch (error) {
      logError("Failed to start development server");
    }
  } else {
    logInfo("To start the development server, run: pnpm dev");
  }
}
