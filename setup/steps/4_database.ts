import { execSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

import {
  logSuccess,
  logError,
  logInfo,
  logWarning,
  getPackageManager,
  getProjectRoot,
} from "../utils";

export function runMigrations(): void {
  try {

    // If no local env file, warn and skip to keep setup non-blocking
    const envPath = join(getProjectRoot(), ".env.local");
    if (!existsSync(envPath)) {
      logWarning(".env.local not found. Skipping database migrations. Create it to enable local DB.");
      return;
    }

    // If DATABASE_URL isn't configured, skip to avoid blocking in ephemeral/dev envs
    let dbUrl: string | undefined;
    try {
      const envContents = readFileSync(envPath, "utf8");
      const dbUrlLine = envContents
        .split(/\r?\n/)
        .find((l) => /^\s*DATABASE_URL\s*=/.test(l) && !/^\s*#/.test(l));
      dbUrl = dbUrlLine?.split("=").slice(1).join("=").trim();
    } catch {
      // ignore, will handle below
    }

    if (!dbUrl) {
      logWarning(
        "DATABASE_URL missing in .env.local. Skipping database migrations. Configure it to enable Prisma.",
      );
      return;
    }

    const isLocal = /localhost|127\.0\.0\.1/.test(dbUrl);
    if (!isLocal) {
      logInfo("Remote/non-local DATABASE_URL detected; assuming migrations handled elsewhere. Skipping.");
      return;
    }

    // Attempt to run migrations (script loads env via dotenv)
    execSync(`${getPackageManager()} db:generate`, { stdio: "ignore" });
    logSuccess("Database migrations completed successfully");
  } catch (error) {
    // Don't block local dev if DB isn't available
    logWarning("Continuing without running database migrations (DB unavailable or command failed)");
    if (error instanceof Error) {
      logError(error.message);
    }
  }
}
