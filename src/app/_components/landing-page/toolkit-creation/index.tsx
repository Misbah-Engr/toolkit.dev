"use client";

import React from "react";

import { motion } from "motion/react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HStack, VStack } from "@/components/ui/stack";
import { CodeBlock } from "@/components/ui/code-block";

import { Section } from "../section";
import { Heading } from "../heading";

import { cn } from "@/lib/utils";

import { toolkitCreationSteps } from "./data";

export const ToolkitCreationSection: React.FC = () => {
  return (
    <Section className="px-2 md:px-8" id="toolkit-creation">
      <Heading
        title={["Designed to Facilitate", "Seamless Toolkit Creation"]}
        description="Create powerful AI agent systems with our intuitive SDK. From simple workflows to complex multi-agent collaborations."
        className="mb-16 md:px-8"
      />
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
          <TabsList className="col-span-5 flex h-fit w-full flex-col gap-2 bg-transparent">
            {toolkitCreationSteps.map((step, index) => (
              <TabsTrigger
                key={index}
                value={index.toString()}
                className="hover:bg-accent/50 border-border data-[state=active]:border-primary dark:data-[state=active]:border-primary group h-auto w-full overflow-hidden rounded-lg p-4 text-left transition-colors"
                asChild
              >
                <HStack className="w-full max-w-full justify-start gap-4 overflow-hidden">
                  <div
                    className={cn(
                      "flex shrink-0 items-center justify-center font-bold",
                      "size-8 md:size-10",
                      "group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground group-hover:bg-primary/10 rounded-full transition-colors",
                    )}
                  >
                    {index + 1}
                  </div>
                  <VStack className="flex-1 items-start gap-0 overflow-hidden">
                    <h3 className="w-full max-w-full text-base font-semibold text-wrap break-words md:text-lg">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground max-w-full text-sm leading-relaxed text-wrap break-words">
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
    </Section>
  );
};
