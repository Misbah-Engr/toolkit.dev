import { logStep, logInfo } from "../utils";

// Configure API keys
export async function configureApiKeys(): Promise<void> {
  logStep(
    "API Keys Configuration",
    "Configuring API keys for external services...",
  );

  logInfo("You can configure API keys now or later by editing .env.local");

  // This function will be called from the main setup script with user input
  // For now, we'll just show the available services
  logInfo("Available services for API key configuration:");
  logInfo(
    "- OpenRouter (Required for AI inference): https://openrouter.ai/settings/keys",
  );
  logInfo("- Exa (Web Search): https://dashboard.exa.ai/api-keys");
  logInfo("- E2B (Code Interpreter): https://e2b.dev/dashboard");
  logInfo("- Mem0 (Memory): https://app.mem0.ai/dashboard/api-keys");
  logInfo(
    "- OpenAI (Image Generation): https://platform.openai.com/settings/organization/api-keys",
  );
  logInfo("- xAI (Image Generation): https://console.x.ai");
  logInfo("- Vercel Blob (File Storage): https://vercel.com/docs/vercel-blob");

  logInfo("Please edit .env.local to add your API keys");
}

// Get available services for API key configuration
export function getAvailableServices() {
  return [
    {
      name: "OpenRouter (Required for AI inference)",
      value: "openrouter",
      description: "https://openrouter.ai/settings/keys",
    },
    {
      name: "Exa (Web Search)",
      value: "exa",
      description: "https://dashboard.exa.ai/api-keys",
    },
    {
      name: "E2B (Code Interpreter)",
      value: "e2b",
      description: "https://e2b.dev/dashboard",
    },
    {
      name: "Mem0 (Memory)",
      value: "mem0",
      description: "https://app.mem0.ai/dashboard/api-keys",
    },
    {
      name: "OpenAI (Image Generation)",
      value: "openai",
      description: "https://platform.openai.com/settings/organization/api-keys",
    },
    {
      name: "xAI (Image Generation)",
      value: "xai",
      description: "https://console.x.ai",
    },
    {
      name: "Vercel Blob (File Storage)",
      value: "vercel-blob",
      description: "https://vercel.com/docs/vercel-blob",
    },
  ];
}
