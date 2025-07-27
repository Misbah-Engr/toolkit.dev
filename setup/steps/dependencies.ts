import { execSync } from "child_process";

import {
  logStep,
  logInfo,
  logSuccess,
  logError,
  getPackageManager,
} from "../utils";

// Install dependencies
export function installDependencies(): void {
  logStep("Installing Dependencies", "Installing project dependencies...");

  try {
    // Check for package manager
    const packageManager = getPackageManager();

    logInfo(`Using ${packageManager} as package manager`);

    execSync(`${packageManager} install`, { stdio: "inherit" });
    logSuccess("Dependencies installed successfully");
  } catch (error) {
    logError("Failed to install dependencies");
    throw error;
  }
}
