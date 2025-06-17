import { Code2, Server, Settings } from "lucide-react";

export const toolkitCreationSteps = [
  {
    icon: Settings,
    title: "Define Base Config",
    description: "Define tools and configuration parameters",
    codeTitle: "base.ts",
    code: `export const baseToolkit = {
  tools: {
    myAction: {
      description: "Performs my custom action",
      inputSchema: z.object({
        query: z.string(),
      }),
      outputSchema: z.object({
        result: z.string(),
      }),
    },
  },
  parameters: z.object({
    apiKey: z.string(),
  }),
};`,
    delay: 0,
  },
  {
    icon: Server,
    title: "Add Server Logic",
    description: "Implement the tool execution",
    codeTitle: "server.ts",
    code: `export const serverToolkit = createServerToolkit(
  baseToolkit,
  "System prompt for toolkit",
  async (params) => ({
    myAction: {
      callback: async (args) => {
        // Your custom logic here
        const result = await callExternalAPI(
          args.query, 
          params.apiKey
        );
        return { result };
      },
    },
  }),
);`,
    delay: 0.1,
  },
  {
    icon: Code2,
    title: "Create Client UI",
    description: "Define a the look and feel",
    codeTitle: "client.tsx",
    code: `export const clientToolkit = createClientToolkit(
  baseMyToolkitConfig,
  {
    name: "My Custom Toolkit",
    description: "Does amazing things",
    icon: MyIcon,
  },
  {
    myAction: {
      CallComponent: ({ args }) => (
        <p>Search for {args.query}</p>
      ),
      CallButtonComponent: ({ result }) => (
        <Button>{result.data}</Button>
      ),
    },
  },
);`,
    delay: 0.2,
  },
];
