#!/usr/bin/env node

import { confirm, select, checkbox } from "@inquirer/prompts";

import { log, logStep, logError, logWarning } from "./utils";

import {
  createEnvFile,
  installDependencies,
  setupDatabase,
  runMigrations,
  setupRedis,
  setupDockerCompose,
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
    logStep("Step 1/6", "Creating environment configuration...");
    createEnvFile();

    // Step 2: Install dependencies
    logStep("Step 2/6", "Installing project dependencies...");
    installDependencies();

    // Step 3: Setup database
    logStep("Step 3/6", "Setting up the database...");
    const useDocker = await confirm({
      message: "Do you want to use Docker/Podman to run the database locally?",
      default: true,
    });

    let dbSuccess = false;
    if (useDocker) {
      dbSuccess = await setupDatabase();
    } else {
      logWarning(
        "Please set up your own PostgreSQL instance and update DATABASE_URL in .env.local",
      );
    }

    if (dbSuccess) {
      // Step 4: Run migrations
      logStep("Step 4/6", "Running database migrations...");
      runMigrations();
    } else {
      logWarning("Skipping migrations due to database setup issues");
    }

    // Step 5: Setup additional services
    logStep("Step 5/6", "Setting up additional services...");
    const setupServices = await confirm({
      message:
        "Do you want to set up additional development services (Redis, etc.)?",
      default: false,
    });

    if (setupServices) {
      const serviceType = await select({
        message: "How would you like to set up additional services?",
        choices: [
          {
            name: "Use Docker Compose (recommended)",
            value: "docker-compose",
            description: "Easier management of multiple services",
          },
          {
            name: "Use individual containers",
            value: "individual",
            description: "Manual setup of each service",
          },
        ],
      });

      if (serviceType === "docker-compose") {
        await setupDockerCompose();
      } else {
        await setupRedis();
      }
    }

    // Step 6: Configure API keys
    logStep("Step 6/6", "Configuring API keys...");
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
