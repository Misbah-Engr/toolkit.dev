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
  const envPath = join(projectRoot, ".env.local");

  if (existsSync(envPath)) {
    logWarning(".env.local already exists. Skipping creation.");
    return;
  }

  const envLocalPath = join(projectRoot, ".env.example");
  if (!existsSync(envLocalPath)) {
    logWarning(".env.example not found. Cannot copy environment file.");
    return;
  }
  const envContent = readFileSync(envLocalPath, "utf8");

  writeFileSync(envPath, envContent);
  logSuccess("Created .env.local file");

  // Generate a secure AUTH_SECRET and append it to .env.local
  try {
    execSync(`${getPackageRunner()} auth secret`, { encoding: "utf8" }).trim();
  } catch (e) {
    logWarning(
      `Failed to generate AUTH_SECRET with '${getPackageRunner()} auth secret'. Please run it manually and add the value to .env.local.`,
    );
  }
}
