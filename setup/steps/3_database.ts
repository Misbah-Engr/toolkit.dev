import { execSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

import {
  logStep,
  logInfo,
  logSuccess,
  logError,
  checkDocker,
  getProjectRoot,
  logWarning,
} from "../utils";

// Setup database
export async function setupDatabase(): Promise<boolean> {
  logStep("Database Setup", "Setting up the database...");

  // Check if DATABASE_URL is set to use external database
  if (isExternalDatabase()) {
    logWarning(
      "DATABASE_URL is configured for external database. Skipping local database setup.",
    );
    logWarning(
      "Please ensure your external PostgreSQL instance is running and accessible",
    );
    return true; // Assume external database is available
  }

  const dockerCmd = checkDocker();
  if (!dockerCmd) {
    logError("Docker or Podman is required but not installed.");
    logInfo("Please install Docker or Podman and try again.");
    logInfo("Docker: https://docs.docker.com/engine/install/");
    logInfo("Podman: https://podman.io/getting-started/installation");
    return false;
  }

  logSuccess(`Found ${dockerCmd}`);

  // Check if database container is already running
  try {
    const containerName = "toolkit-postgres";
    const isRunning = execSync(`${dockerCmd} ps -q -f name=${containerName}`, {
      encoding: "utf8",
    }).trim();

    if (isRunning) {
      logSuccess("Database container is already running");
      return true;
    }
  } catch (error) {
    // Container not running, continue with setup
  }

  try {
    logInfo("Starting database container using Docker Compose...");

    // Use docker-compose to start only the postgres service
    execSync("docker-compose up -d postgres", { stdio: "inherit" });

    logSuccess("Database container started successfully");
    return true;
  } catch (error) {
    logError("Failed to start database container");
    return false;
  }
}

// Check if DATABASE_URL is configured for external database
function isExternalDatabase(): boolean {
  const projectRoot = getProjectRoot();
  const envPath = join(projectRoot, ".env.local");

  if (!existsSync(envPath)) {
    return false;
  }

  const envContent = readFileSync(envPath, "utf8");
  const databaseUrlMatch = /DATABASE_URL=(.+)/.exec(envContent);

  if (databaseUrlMatch?.[1]) {
    const databaseUrl = databaseUrlMatch[1].trim();
    // Check if DATABASE_URL is not the expected local format
    const expectedLocalUrl =
      "postgresql://postgres:password@localhost:5432/toolkit";
    if (
      databaseUrl !== expectedLocalUrl &&
      !databaseUrl.includes("localhost:5432")
    ) {
      return true;
    }
  }

  return false;
}

// Run database migrations
export function runMigrations(): void {
  logStep("Database Migrations", "Running database migrations...");

  try {
    execSync("pnpm db:generate", { stdio: "inherit" });
    logSuccess("Database migrations completed successfully");
  } catch (error) {
    logError("Failed to run database migrations");
    throw error;
  }
}
