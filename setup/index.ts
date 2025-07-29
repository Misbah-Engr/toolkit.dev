#!/usr/bin/env node

import { log, logStep, logError } from "./utils";

import { createEnvFile, installDependencies, runMigrations } from "./steps";

// Main setup function
async function main(): Promise<void> {
  log("🚀 Toolkit.dev Setup Script", "bright");
  log(
    "This script will help you set up the Toolkit.dev project for development.\n",
    "cyan",
  );

  try {
    // Step 1: Create .env.local
    logStep("Step 1/6", "Creating environment configuration...");
    createEnvFile();

    // Step 2: Install dependencies
    logStep("Step 2/6", "Installing project dependencies...");
    installDependencies();

    // Step 3: Setup database
    logStep("Step 4/6", "Running database migrations...");

    runMigrations();
  } catch (error) {
    logError("Setup failed: " + (error as Error).message);
  }
}

// Run the setup
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    if (error instanceof Error && error.name === "ExitPromptError") {
      log(
        "\n👋 Setup cancelled. You can run the setup again anytime with: pnpm dev:setup",
        "yellow",
      );
      process.exit(0);
    } else {
      logError("Setup failed: " + (error as Error).message);
      process.exit(1);
    }
  });
}
