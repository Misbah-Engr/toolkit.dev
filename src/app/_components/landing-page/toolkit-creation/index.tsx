"use client";

import React from "react";
import { motion } from "motion/react";
import { Code2, Server, Settings, Zap, type LucideIcon } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { HStack, VStack } from "@/components/ui/stack";
import { toolkitCreationSteps } from "./data";

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

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-4">
          {toolkitCreationSteps.map((step, index) => (
            <StepCard key={index} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StepCard: React.FC<{
  icon: LucideIcon;
  title: string;
  description: string;
  code: string;
  codeTitle: string;
  delay: number;
}> = ({ icon: Icon, title, description, code, codeTitle, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
  >
    <VStack className="h-full items-start gap-4">
      <HStack className="gap-4">
        <div className="bg-primary/10 rounded-lg p-2">
          {<Icon className="size-6" />}
        </div>
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </HStack>
      <CodeBlock
        language="typescript"
        value={code}
        heading={codeTitle}
        showLineNumbers={false}
        allowCopy={false}
      />
    </VStack>
  </motion.div>
);
