import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";

const code =
  "import requests\n\n# Fetch the actual README from the correct path\nurl = 'https://raw.githubusercontent.com/vercel/ai/main/packages/ai/README.md'\nresponse = requests.get(url)\nreadme_content = response.text\n\n# Print the first 1500 characters for inspection\nprint(readme_content[:1500])";

const result = {
  logs: {
    stderr: [],
    stdout: [
      "![hero illustration](./assets/hero.gif)\n\n# AI SDK\n\nThe [AI SDK](https://ai-sdk.dev/docs) is a TypeScript toolkit designed to help you build AI-powered applications using popular frameworks like Next.js, React, Svelte, Vue and runtimes like Node.js.\n\nTo learn more about how to use the AI SDK, check out our [API Reference](https://ai-sdk.dev/docs/reference) and [Documentation](https://ai-sdk.dev/docs).\n\n## Installation\n\nYou will need Node.js 18+ and pnpm installed on your local development machine.\n\n```shell\nnpm install ai\n```\n\n## Usage\n\n### AI SDK Core\n\nThe [AI SDK Core](https://ai-sdk.dev/docs/ai-sdk-core/overview) module provides a unified API to interact with model providers like [OpenAI](https://ai-sdk.dev/providers/ai-sdk-providers/openai), [Anthropic](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic), [Google](https://ai-sdk.dev/providers/ai-sdk-providers/google-generative-ai), and more.\n\nYou will then install the model provider of your choice.\n\n```shell\nnpm install @ai-sdk/openai\n```\n\n###### @/index.ts (Node.js Runtime)\n\n```ts\nimport { generateText } from 'ai';\nimport { openai } from '@ai-sdk/openai'; // Ensure OPENAI_API_KEY environment variable is set\n\nconst { text } = await generateText({\n  model: openai('gpt-4o'),\n  system: 'You are a friendly assistant!',\n  prompt: 'Why is the sky blue?',\n});\n\nconsole.log(text);\n```\n\n### AI SDK UI\n\nThe [AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/overview) module provides a set of hooks that help you build chatbots and gene\n",
    ],
  },
  results: [],
};

export const CodeExecutionCalling: React.FC = () => {
  return (
    <div className="w-full space-y-2">
      <h1 className="text-muted-foreground text-sm font-medium">
        Executing Python Code
      </h1>
      <CodeBlock
        language="python"
        value={code}
        showLineNumbers={false}
        headerClassName="hidden"
      />
    </div>
  );
};

export const CodeExecutionResult: React.FC = () => {
  return (
    <div className="w-full space-y-2">
      <div className="w-full space-y-2">
        <h1 className="text-muted-foreground text-sm font-medium">
          Executing Python Code
        </h1>
        <CodeBlock
          language="python"
          value={code}
          showLineNumbers={false}
          headerClassName="hidden"
        />
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="logs">
          <AccordionTrigger className="cursor-pointer p-0 hover:no-underline">
            <h3 className="text-primary flex items-center gap-2 text-sm font-medium">
              Execution Logs
              {result.logs.stdout.length > 0 && (
                <Badge variant="outline" className="text-xs">
                  {result.logs.stdout.length} stdout
                </Badge>
              )}
              {result.logs.stderr.length > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {result.logs.stderr.length} stderr
                </Badge>
              )}
            </h3>
          </AccordionTrigger>
          <AccordionContent className="p-0 pt-2">
            <div className="space-y-2">
              {result.logs.stdout.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-xs font-medium">
                      Standard Output
                    </span>
                  </div>
                  <div className="bg-muted rounded-md p-3">
                    <pre className="text-muted-foreground text-xs whitespace-pre-wrap">
                      {result.logs.stdout.join("\n")}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
