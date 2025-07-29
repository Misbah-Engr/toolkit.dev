import { execSync } from "child_process";

import { logStep, logSuccess, logError, getPackageManager } from "../utils";

// Run database migrations
export function runMigrations(): void {
  logStep("Database Migrations", "Running database migrations...");

  try {
    execSync(`${getPackageManager()} db:generate`, { stdio: "inherit" });
    logSuccess("Database migrations completed successfully");
  } catch (error) {
    logError("Failed to run database migrations");
    throw error;
  }
}
