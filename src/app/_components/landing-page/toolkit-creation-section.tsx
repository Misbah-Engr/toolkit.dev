"use client";

import React from "react";
import { motion } from "motion/react";
import { Code2, Server, Settings, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CodeBlock: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => (
  <div className="rounded-lg border bg-muted/50 overflow-hidden">
    <div className="px-4 py-2 bg-muted/80 border-b text-sm font-medium text-muted-foreground">
      {title}
    </div>
    <pre className="p-4 text-sm overflow-x-auto">
      <code>{children}</code>
    </pre>
  </div>
);

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
    <Card className="h-full border-border/50 hover:border-primary/20 transition-colors">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            {icon}
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CodeBlock title={codeTitle}>
          {code}
        </CodeBlock>
      </CardContent>
    </Card>
  </motion.div>
);

export const ToolkitCreationSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Create Custom Toolkits
            <span className="block text-primary">In Minutes, Not Hours</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building new AI capabilities is as simple as defining your tools. 
            Configure server tools and client tools, and it automatically works with the entire system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <StepCard
            icon={<Settings className="h-5 w-5 text-primary" />}
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
            icon={<Server className="h-5 w-5 text-primary" />}
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
            icon={<Code2 className="h-5 w-5 text-primary" />}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="inline-block border-primary/20 bg-primary/5">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">That&apos;s It!</h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                Your toolkit automatically integrates with the entire system. 
                Users can discover it, configure it, and combine it with other toolkits seamlessly.
              </p>
              <Button className="font-semibold">
                Start Building Your Toolkit
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};