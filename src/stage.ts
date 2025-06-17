export const data = [
  { type: "step-start" },
  {
    type: "tool-invocation",
    toolInvocation: {
      args: {
        code: "import requests\n\n# Fetch the README from the vercel/ai GitHub repository\nurl = 'https://raw.githubusercontent.com/vercel/ai/main/README.md'\nresponse = requests.get(url)\nreadme_content = response.text\n\n# Print the first 1000 characters for inspection\nprint(readme_content[:1000])\n",
      },
      step: 0,
      state: "result",
      result: {
        result: {
          logs: { stderr: [], stdout: ["packages/ai/README.md\n\n"] },
          results: [],
        },
        message:
          "Code executed successfully with logs. The user is shown the code and the logs, so you do not have to reiterate them. If you ran code to answer a question, answer the users question given the results.",
      },
      toolName: "e2b_run-code",
      toolCallId: "call_J2OhKuuTxAXkSQYswaVRw3Z6",
    },
  },
  { type: "step-start" },
  {
    text: 'It appears that the main README at the root of the vercel/ai repository simply points to packages/ai/README.md. I will fetch the actual content from packages/ai/README.md and then write a "Getting Started" guide for you.\n\nLet me fetch the correct README and summarize the steps.',
    type: "text",
  },
  {
    type: "tool-invocation",
    toolInvocation: {
      args: {
        code: "import requests\n\n# Fetch the actual README from the correct path\nurl = 'https://raw.githubusercontent.com/vercel/ai/main/packages/ai/README.md'\nresponse = requests.get(url)\nreadme_content = response.text\n\n# Print the first 1500 characters for inspection\nprint(readme_content[:1500])",
      },
      step: 1,
      state: "result",
      result: {
        result: {
          logs: {
            stderr: [],
            stdout: [
              "![hero illustration](./assets/hero.gif)\n\n# AI SDK\n\nThe [AI SDK](https://ai-sdk.dev/docs) is a TypeScript toolkit designed to help you build AI-powered applications using popular frameworks like Next.js, React, Svelte, Vue and runtimes like Node.js.\n\nTo learn more about how to use the AI SDK, check out our [API Reference](https://ai-sdk.dev/docs/reference) and [Documentation](https://ai-sdk.dev/docs).\n\n## Installation\n\nYou will need Node.js 18+ and pnpm installed on your local development machine.\n\n```shell\nnpm install ai\n```\n\n## Usage\n\n### AI SDK Core\n\nThe [AI SDK Core](https://ai-sdk.dev/docs/ai-sdk-core/overview) module provides a unified API to interact with model providers like [OpenAI](https://ai-sdk.dev/providers/ai-sdk-providers/openai), [Anthropic](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic), [Google](https://ai-sdk.dev/providers/ai-sdk-providers/google-generative-ai), and more.\n\nYou will then install the model provider of your choice.\n\n```shell\nnpm install @ai-sdk/openai\n```\n\n###### @/index.ts (Node.js Runtime)\n\n```ts\nimport { generateText } from 'ai';\nimport { openai } from '@ai-sdk/openai'; // Ensure OPENAI_API_KEY environment variable is set\n\nconst { text } = await generateText({\n  model: openai('gpt-4o'),\n  system: 'You are a friendly assistant!',\n  prompt: 'Why is the sky blue?',\n});\n\nconsole.log(text);\n```\n\n### AI SDK UI\n\nThe [AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/overview) module provides a set of hooks that help you build chatbots and gene\n",
            ],
          },
          results: [],
        },
        message:
          "Code executed successfully with logs. The user is shown the code and the logs, so you do not have to reiterate them. If you ran code to answer a question, answer the users question given the results.",
      },
      toolName: "e2b_run-code",
      toolCallId: "call_ysqDNiOWXPzS1gevkANfvTcq",
    },
  },
  { type: "step-start" },
  {
    text: "Here's a Getting Started guide for the vercel/ai SDK, based on the official README:\n\n---\n\n## Getting Started with Vercel AI SDK\n\nThe Vercel AI SDK is a TypeScript toolkit for building AI-powered applications using frameworks like Next.js, React, Svelte, Vue, and runtimes like Node.js.\n\n### 1. Prerequisites\n\n- Node.js 18 or higher\n- npm or pnpm installed\n\n### 2. Installation\n\nInstall the core AI SDK package:\n\n```bash\nnpm install ai\n```\n\nThen, install the model provider you want to use (for example, OpenAI):\n\n```bash\nnpm install @ai-sdk/openai\n```\n\n### 3. Basic Usage Example\n\nHere’s how to generate text using OpenAI’s GPT-4o model:\n\n```typescript\nimport { generateText } from 'ai';\nimport { openai } from '@ai-sdk/openai'; // Make sure OPENAI_API_KEY is set in your environment\n\nconst { text } = await generateText({\n  model: openai('gpt-4o'),\n  system: 'You are a friendly assistant!',\n  prompt: 'Why is the sky blue?',\n});\n\nconsole.log(text);\n```\n\n### 4. Environment Variables\n\nSet your API key (for example, for OpenAI):\n\n```bash\nexport OPENAI_API_KEY=your-openai-api-key\n```\n\n### 5. Next Steps\n\n- Explore the [AI SDK Documentation](https://ai-sdk.dev/docs) for more features, including UI hooks for building chatbots and generative UIs.\n- Check out the [API Reference](https://ai-sdk.dev/docs/reference) for advanced usage.\n\n---\n\nLet me know if you want a guide for a specific framework (like Next.js or React) or more advanced examples!",
    type: "text",
  },
];
