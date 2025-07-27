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
  let envContent: string;

  if (existsSync(envLocalPath)) {
    envContent = readFileSync(envLocalPath, "utf8");
  } else {
    // Create default environment configuration for local development
    envContent = `# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/toolkit"

# Auth
AUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"

# AI/Inference
OPENROUTER_API_KEY=""

# Optional: Web Search
EXA_API_KEY=""

# Optional: Code Interpreter
E2B_API_KEY=""

# Optional: Memory
MEM0_API_KEY=""

# Optional: Image Generation
OPENAI_API_KEY=""
XAI_API_KEY=""

# Optional: File Storage
BLOB_READ_WRITE_TOKEN=""

# Optional: Redis for resumable streams
REDIS_URL="redis://localhost:6379"

# Optional: GitHub integration
GITHUB_TOKEN=""

# Development
NODE_ENV="development"
PRISMA_LOG_QUERIES="false"
`;
  }

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
