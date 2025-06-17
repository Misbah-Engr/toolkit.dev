"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Code, type LucideIcon } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { HStack, VStack } from "@/components/ui/stack";
import { toolkitCreationSteps } from "./data";
import { Button } from "@/components/ui/button";

export const ToolkitCreationSection: React.FC = () => {
  return (
    <section className="from-background to-muted/20 bg-gradient-to-b py-24">
      <div className="container mx-auto px-2 md:px-4">
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
          <p className="text-muted-foreground mx-auto mb-4 max-w-2xl text-lg">
            Building new AI capabilities is as simple as defining your tools.
            Configure server tools and client tools, and it automatically works
            with the entire system.
          </p>
          <Link href="https://github.com/jasonhedman/open-chat/tree/main/src/toolkits">
            <Button className="user-message">
              <Code className="size-4" />
              Start Building
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
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
        <div className="bg-primary/40 rounded-lg p-2">
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
        headerClassName="bg-primary/20 dark:bg-primary/20 py-2"
        headingClassName="text-base font-bold"
      />
    </VStack>
  </motion.div>
);
