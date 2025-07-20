"use client";

import React from "react";

import Link from "next/link";

import { motion } from "motion/react";

import { Code } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";

import { toolkitCreationSteps } from "./data";
import { HStack, VStack } from "@/components/ui/stack";
import { cn } from "@/lib/utils";

export const ToolkitCreationSection: React.FC = () => {
  return (
    <section
      className="from-background to-muted/20 bg-gradient-to-b py-24"
      id="toolkit-creation"
    >
      <div className="container mx-auto px-2 md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Build AI Agent Workflows
            <span className="text-primary block">With Simple Code</span>
          </h2>
          <p className="text-muted-foreground mx-auto mb-4 max-w-2xl text-lg">
            Create powerful AI agent systems with our intuitive SDK. From simple
            workflows to complex multi-agent collaborations.
          </p>
          <Link href="https://github.com/jasonhedman/toolkit.dev/tree/main/src/toolkits">
            <Button className="user-message">
              <Code className="size-4" />
              Start Building
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Tabs
            defaultValue="0"
            className="grid w-full grid-cols-1 md:grid-cols-12"
          >
            <TabsList className="col-span-5 flex h-fit w-full flex-col bg-transparent">
              {toolkitCreationSteps.map((step, index) => (
                <TabsTrigger
                  key={index}
                  value={index.toString()}
                  className="hover:bg-accent/50 data-[state=active]:bg-accent data-[state=active]:border-primary h-auto w-full rounded-lg border p-4 text-left"
                  asChild
                >
                  <HStack className="w-full justify-start gap-4">
                    <div
                      className={cn(
                        "flex items-center justify-center font-bold",
                        "size-8 md:size-10",
                      )}
                    >
                      {index + 1}
                    </div>
                    <VStack className="items-start gap-1">
                      <h3 className="text-base font-semibold md:text-lg">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </VStack>
                  </HStack>
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="col-span-7">
              {toolkitCreationSteps.map((step, index) => (
                <TabsContent
                  key={index}
                  value={index.toString()}
                  className="mt-0"
                >
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CodeBlock
                      language="typescript"
                      value={step.code}
                      showLineNumbers={false}
                      allowCopy={true}
                      headerClassName="bg-primary/20 dark:bg-primary/20 py-2"
                    />
                  </motion.div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};
