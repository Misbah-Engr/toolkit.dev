import { execSync } from "child_process";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { type ColorKey } from "./types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Colors for console output
export const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
} as const;

export function log(message: string, color: ColorKey = "reset"): void {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

export function logStep(step: string, message: string): void {
  log(`\n${colors.cyan}${step}${colors.reset}`, "bright");
  log(message);
}

export function logSuccess(message: string): void {
  log(`✅ ${message}`, "green");
}

export function logError(message: string): void {
  log(`❌ ${message}`, "red");
}

export function logWarning(message: string): void {
  log(`⚠️  ${message}`, "yellow");
}

export function logInfo(message: string): void {
  log(`ℹ️  ${message}`, "blue");
}

// Check if command exists
export function commandExists(command: string): boolean {
  try {
    execSync(`which ${command}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

// Check if Docker/Podman is available
export function checkDocker(): string | null {
  if (commandExists("docker")) {
    return "docker";
  } else if (commandExists("podman")) {
    return "podman";
  }
  return null;
}

// Get project root directory
export function getProjectRoot(): string {
  return join(__dirname, "..");
}

// Get service URL for API key
export function getServiceUrl(service: string): string {
  const urls: Record<string, string> = {
    openrouter: "https://openrouter.ai/settings/keys",
    exa: "https://dashboard.exa.ai/api-keys",
    e2b: "https://e2b.dev/dashboard",
    mem0: "https://app.mem0.ai/dashboard/api-keys",
    openai: "https://platform.openai.com/settings/organization/api-keys",
    xai: "https://console.x.ai",
    "vercel-blob": "https://vercel.com/docs/vercel-blob",
  };

  return urls[service] ?? "";
}

export function getPackageManager(): string {
  if (commandExists("pnpm")) {
    return "pnpm";
  } else if (commandExists("yarn")) {
    return "yarn";
  } else if (commandExists("bun")) {
    return "bun";
  } else if (commandExists("npm")) {
    return "npm";
  }
  throw new Error("No package manager found");
}

export function getPackageRunner(): string {
  const packageManager = getPackageManager();
  if (packageManager === "pnpm") {
    return "pnpm dlx";
  } else if (packageManager === "yarn") {
    return "yarn dlx";
  } else if (packageManager === "bun") {
    return "bunx";
  } else if (packageManager === "npm") {
    return "npx";
  }
  throw new Error("No package runner found");
}
