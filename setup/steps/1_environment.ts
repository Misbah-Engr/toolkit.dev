import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import {
  logSuccess,
  logWarning,
  getProjectRoot,
  getPackageRunner,
} from "../utils";

// Create .env.local file
export function createEnvFile() {
  const projectRoot = getProjectRoot();
  const envLocalPath = join(projectRoot, ".env.local");

  if (existsSync(envLocalPath)) {
    logWarning(".env.local already exists. Skipping creation.");
    return;
  }

  const envExamplePath = join(projectRoot, ".env.example");
  let envContent: string;

  if (existsSync(envExamplePath)) {
    envContent = readFileSync(envExamplePath, "utf8");
  } else {
    throw new Error(".env.example not found");
  }

  writeFileSync(envLocalPath, envContent);
  logSuccess("Created .env.local file");

  // Generate a secure AUTH_SECRET and append it to .env.local
  try {
    execSync(`${getPackageRunner()} auth secret`, {
      encoding: "utf8",
      stdio: "ignore",
    }).trim();
  } catch (e) {
    logWarning(
      `Failed to generate AUTH_SECRET with '${getPackageRunner()} auth secret'. Please run it manually and add the value to .env.local.`,
    );
  }
}
