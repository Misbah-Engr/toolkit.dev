import { execSync } from "child_process";
import { existsSync } from "fs";
import { join } from "path";

import {
  logStep,
  logInfo,
  logSuccess,
  logError,
  getProjectRoot,
  checkDocker,
} from "../utils";

// Start Docker Compose services
export function startDockerServices(): void {
  logStep(
    "Starting Docker Services",
    "Starting PostgreSQL, Redis, and Vercel Blob services...",
  );

  try {
    // Check if Docker is available
    const dockerCommand = checkDocker();
    if (!dockerCommand) {
      logError(
        "Docker or Podman is not installed. Please install Docker or Podman first.",
      );
      throw new Error("Docker not found");
    }

    logInfo(`Using ${dockerCommand} as container runtime`);

    // Check if docker-compose.yml exists
    const projectRoot = getProjectRoot();
    const dockerComposePath = join(projectRoot, "docker-compose.yml");

    if (!existsSync(dockerComposePath)) {
      logError("docker-compose.yml not found in project root");
      throw new Error("Docker Compose file not found");
    }

    // Start Docker Compose services in detached mode
    logInfo("Starting Docker Compose services...");
    execSync(`${dockerCommand} compose up -d`, {
      stdio: "ignore",
      cwd: projectRoot,
    });

    logSuccess("Docker services started successfully");
    logInfo("Services running:");
    logInfo("  - PostgreSQL: localhost:5432");
    logInfo("  - Redis: localhost:6379");
    logInfo("  - Vercel Blob: localhost:6969");
  } catch (error) {
    logError("Failed to start Docker services");
    if (error instanceof Error) {
      logError(error.message);
    }
    throw error;
  }
}
