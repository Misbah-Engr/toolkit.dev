import { execSync } from "child_process";

import {
  logStep,
  logInfo,
  logSuccess,
  logError,
  checkDocker,
  commandExists,
} from "../utils";

// Setup Redis
export async function setupRedis(): Promise<boolean> {
  logStep("Redis Setup", "Setting up Redis with Docker Compose...");

  const dockerCmd = checkDocker();
  if (!dockerCmd) {
    logError("Docker or Podman is required for Redis setup");
    return false;
  }

  // Check if docker-compose is available
  if (
    !commandExists("docker-compose") &&
    !commandExists("docker") &&
    !commandExists("podman")
  ) {
    logError("Docker Compose is not available");
    logInfo("Please install Docker Compose to continue");
    return false;
  }

  try {
    logInfo("Starting Redis with Docker Compose...");

    // Use docker compose (newer) or docker-compose (older)
    const composeCmd = commandExists("docker")
      ? "docker compose"
      : "docker-compose";

    execSync(`${composeCmd} up -d redis`, { stdio: "inherit" });
    logSuccess("Redis started successfully with Docker Compose");
    logInfo("Redis is now available at localhost:6379");
    return true;
  } catch (error) {
    logError("Failed to start Redis with Docker Compose");
    return false;
  }
}
