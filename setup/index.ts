#!/usr/bin/env node

import { confirm, checkbox } from "@inquirer/prompts";

import { log, logStep, logError, logWarning } from "./utils";

import {
  createEnvFile,
  installDependencies,
  setupDatabase,
  runMigrations,
  setupRedis,
  configureApiKeys,
  getAvailableServices,
  startDevServer,
} from "./steps";

// Main setup function
async function main(): Promise<void> {
  log("🚀 Toolkit.dev Setup Script", "bright");
  log(
    "This script will help you set up the Toolkit.dev project for development.\n",
    "cyan",
  );

  try {
    // Step 1: Create .env.local
    logStep("Step 1/7", "Creating environment configuration...");
    createEnvFile();

    // Step 2: Install dependencies
    logStep("Step 2/7", "Installing project dependencies...");
    installDependencies();

    // Step 3: Setup database
    logStep("Step 3/7", "Setting up the database...");

    const dbSuccess = await setupDatabase();

    if (dbSuccess) {
      // Step 4: Run migrations
      logStep("Step 4/7", "Running database migrations...");
      runMigrations();
    } else {
      logWarning("Step 4/7: Skipping migrations due to database setup issues");
    }

    // Step 5: Setup Redis
    logStep("Step 5/7", "Setting up Redis for resumable streams...");
    const setupRedisService = await confirm({
      message: "Do you want to set up Redis for resumable streams?",
      default: true,
    });

    if (setupRedisService) {
      await setupRedis();
    }

    // Step 6: Configure API keys
    logStep("Step 6/7", "Configuring API keys...");
    const configureNow = await confirm({
      message: "Do you want to configure API keys now?",
      default: false,
    });

    if (configureNow) {
      const apiKeysToConfigure = await checkbox({
        message: "Which API keys would you like to configure?",
        choices: getAvailableServices(),
      });

      if (apiKeysToConfigure.length > 0) {
        logWarning("Please get your API keys from the following services:");

        for (const service of apiKeysToConfigure) {
          const serviceInfo = getAvailableServices().find(
            (s) => s.value === service,
          );
          if (serviceInfo) {
            logWarning(`- ${serviceInfo.name}: ${serviceInfo.description}`);
          }
        }

        logWarning("Please edit .env.local to add your API keys");
      }
    } else {
      await configureApiKeys();
    }

    // Final steps
    log("\n🎉 Setup Complete!", "green");
    log("\nNext steps:", "bright");
    log("1. Edit .env.local to add your API keys");
    log('2. Run "pnpm dev" to start the development server');
    log("3. Visit http://localhost:3000 to see your application");
    log("\nFor more information, see the README.md file", "cyan");

    // Ask if user wants to start the dev server
    const startServer = await confirm({
      message: "Do you want to start the development server now?",
      default: true,
    });

    if (startServer) {
      startDevServer();
    }
  } catch (error) {
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
