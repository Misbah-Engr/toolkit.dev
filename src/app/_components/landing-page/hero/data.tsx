import {
  CodeExecutionCalling,
  CodeExecutionResult,
} from "./message/code-execution";
import { MemoryCalling, MemoryResult } from "./message/memory";
import { SearchCalling, SearchResult } from "./message/recent-ai-news";
import { RepositoryCalling, RepositoryResult } from "./message/repository";
import {
  TopRepositoriesCalling,
  TopRepositoriesResult,
} from "./message/top-repositories";
import type { Message } from "./types";
import { Toolkits } from "@/toolkits/toolkits/shared";

export const demoSequence: Message[] = [
  {
    id: "1",
    type: "user",
    content: "Can you help me research Vercel's AI repositories?",
  },
  {
    id: "2",
    type: "tool",
    callComponent: <TopRepositoriesCalling />,
    resultComponent: <TopRepositoriesResult />,
    toolkit: Toolkits.Github,
  },
  {
    id: "3",
    type: "tool",
    callComponent: <RepositoryCalling />,
    resultComponent: <RepositoryResult />,
    toolkit: Toolkits.Github,
  },
  {
    id: "4",
    type: "assistant",
    content:
      "Based on my research, here are the key AI startup trends: Edge AI, Autonomous agents, and Multimodal AI are leading the market...",
  },
  {
    id: "5",
    type: "user",
    content:
      "I am building an AI chatbot and I want to learn how to use the vercel/ai toolkit. Can you help me find some resources?",
  },
  {
    id: "6",
    type: "tool",
    callComponent: <MemoryCalling />,
    resultComponent: <MemoryResult />,
    toolkit: Toolkits.Memory,
  },
  {
    id: "7",
    type: "tool",
    callComponent: <SearchCalling />,
    resultComponent: <SearchResult />,
    toolkit: Toolkits.Exa,
  },
  {
    id: "8",
    type: "assistant",
    content:
      "Let me fetch the README for the vercel/ai repository write a getting started guide for you. You can also check out the docs for the vercel/ai toolkit [here](https://sdk.vercel.ai/docs).",
  },
  {
    id: "9",
    type: "tool",
    callComponent: <CodeExecutionCalling />,
    resultComponent: <CodeExecutionResult />,
    toolkit: Toolkits.E2B,
  },
  {
    id: "10",
    type: "assistant",
    content:
      "Here's a Getting Started guide for the vercel/ai SDK, based on the official README:\n\n ### 1. Installation\n\nInstall the core AI SDK package:\n\n```bash\nnpm install ai\n```\n\nThen, install the model provider you want to use (for example, OpenAI):\n\n```bash\nnpm install @ai-sdk/openai\n```\n\n### 2. Basic Usage Example\n\nHere’s how to generate text using OpenAI’s GPT-4o model:\n\n```typescript\nimport { generateText } from 'ai';\nimport { openai } from '@ai-sdk/openai'; // Make sure OPENAI_API_KEY is set in your environment\n\nconst { text } = await generateText({\n  model: openai('gpt-4o'),\n  system: 'You are a friendly assistant!',\n  prompt: 'Why is the sky blue?',\n});\n\nconsole.log(text);\n```\n\nLet me know if you want a guide for a specific framework (like Next.js or React) or more advanced examples!",
  },
];
