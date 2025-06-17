"use client";

import React from "react";
import { motion } from "motion/react";
import { Code2, Server, Settings, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { HStack, VStack } from "@/components/ui/stack";

const StepCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  code: string;
  codeTitle: string;
  delay: number;
}> = ({ icon, title, description, code, codeTitle, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
  >
    <VStack className="h-full">
      <HStack className="gap-4">
        <div className="bg-primary/10 rounded-lg p-2">{icon}</div>
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
        </div>
      </HStack>
      <CodeBlock language="typescript" value={code} heading={codeTitle} />
    </VStack>
  </motion.div>
);

export const ToolkitCreationSection: React.FC = () => {
  return (
    <section className="from-background to-muted/20 bg-gradient-to-b py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Create Custom Toolkits
            <span className="text-primary block">In Minutes, Not Hours</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Building new AI capabilities is as simple as defining your tools.
            Configure server tools and client tools, and it automatically works
            with the entire system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StepCard
            icon={<Settings className="text-primary h-5 w-5" />}
            title="Define Base Config"
            description="Start with a simple configuration defining your toolkit's identity and parameters"
            codeTitle="base.ts"
            code={`export const baseMyToolkitConfig = {
  tools: {
    myAction: {
      description: "Performs my custom action",
      inputSchema: z.object({
        input: z.string(),
      }),
      outputSchema: z.object({
        result: z.string(),
      }),
    },
  },
  parameters: z.object({
    apiKey: z.string(),
  }),
};`}
            delay={0}
          />

          <StepCard
            icon={<Server className="text-primary h-5 w-5" />}
            title="Add Server Logic"
            description="Implement the actual functionality that runs on the server"
            codeTitle="server.ts"
            code={`export const myToolkitServer = createServerToolkit(
  baseMyToolkitConfig,
  "System prompt for my toolkit",
  async (params) => ({
    myAction: {
      callback: async (args) => {
        // Your custom logic here
        const result = await callExternalAPI(
          args.input, 
          params.apiKey
        );
        return { result };
      },
    },
  }),
);`}
            delay={0.1}
          />

          <StepCard
            icon={<Code2 className="text-primary h-5 w-5" />}
            title="Create Client UI"
            description="Define how your toolkit appears and behaves in the user interface"
            codeTitle="client.tsx"
            code={`export const myClientToolkit = createClientToolkit(
  baseMyToolkitConfig,
  {
    name: "My Custom Toolkit",
    description: "Does amazing things",
    icon: MyIcon,
    form: null,
    type: ToolkitGroups.DataSource,
  },
  {
    myAction: myActionToolConfigClient,
  },
);`}
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
};
