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
  logStep("Redis Setup", "Setting up Redis for resumable streams...");

  const dockerCmd = checkDocker();
  if (!dockerCmd) {
    logError("Docker or Podman is required for Redis setup");
    return false;
  }

  try {
    logInfo("Starting Redis container...");
    execSync(
      `${dockerCmd} run -d --name toolkit-redis -p 6379:6379 redis:alpine`,
      { stdio: "inherit" },
    );
    logSuccess("Redis container started successfully");
    return true;
  } catch (error) {
    logError("Failed to start Redis container");
    return false;
  }
}

// Setup Docker Compose services
export async function setupDockerCompose(): Promise<boolean> {
  logStep("Docker Compose Setup", "Setting up services with Docker Compose...");

  const dockerCmd = checkDocker();
  if (!dockerCmd) {
    logError("Docker or Podman is required for Docker Compose setup");
    return false;
  }

  // Check if docker-compose is available
  if (
    !commandExists("docker-compose") &&
    !commandExists("docker") &&
    !commandExists("podman")
  ) {
    logError("Docker Compose is not available");
    logInfo("Please install Docker Compose or use individual containers");
    return false;
  }

  try {
    logInfo("Starting services with Docker Compose...");

    // Use docker compose (newer) or docker-compose (older)
    const composeCmd = commandExists("docker")
      ? "docker compose"
      : "docker-compose";

    execSync(`${composeCmd} up -d`, { stdio: "inherit" });
    logSuccess("Docker Compose services started successfully");

    logInfo("Services available:");
    logInfo("- PostgreSQL: localhost:5432");
    logInfo("- Redis: localhost:6379");

    return true;
  } catch (error) {
    logError("Failed to start Docker Compose services");
    return false;
  }
}
