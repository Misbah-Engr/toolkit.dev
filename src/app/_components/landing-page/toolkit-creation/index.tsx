"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Code } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";
import { agentWorkflowExamples } from "./data";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
            Create powerful AI agent systems with our intuitive SDK. From simple workflows to complex multi-agent collaborations.
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
          <Tabs defaultValue="simple" className="w-full">
            {/* Mobile: Horizontal scrollable tabs */}
            <div className="lg:hidden">
              <div className="overflow-x-auto">
                <TabsList className="grid w-max grid-cols-4 mb-6">
                  {agentWorkflowExamples.map((example) => (
                    <TabsTrigger 
                      key={example.id} 
                      value={example.id}
                      className="whitespace-nowrap px-4 py-2 text-sm"
                    >
                      {example.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {/* Mobile: Code below tabs */}
              <div className="mt-6">
                {agentWorkflowExamples.map((example) => (
                  <TabsContent key={example.id} value={example.id} className="mt-0">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold">{example.title}</h3>
                        <p className="text-muted-foreground text-sm">{example.description}</p>
                      </div>
                      <CodeBlock
                        language="typescript"
                        value={example.code}
                        showLineNumbers={false}
                        allowCopy={true}
                        headerClassName="bg-primary/20 dark:bg-primary/20 py-2"
                      />
                    </div>
                  </TabsContent>
                ))}
              </div>
            </div>

            {/* Desktop: Side-by-side layout */}
            <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Left side: Tabs as cards */}
              <div className="col-span-5 space-y-2">
                {agentWorkflowExamples.map((example, index) => (
                  <TabsTrigger
                    key={example.id}
                    value={example.id}
                    className="w-full h-auto p-4 text-left border rounded-lg bg-card hover:bg-accent/50 data-[state=active]:bg-accent data-[state=active]:border-primary"
                    asChild
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="space-y-2">
                        <h3 className="font-semibold text-base">{example.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {example.description}
                        </p>
                      </div>
                    </motion.div>
                  </TabsTrigger>
                ))}
              </div>

              {/* Right side: Code display */}
              <div className="col-span-7">
                {agentWorkflowExamples.map((example) => (
                  <TabsContent key={example.id} value={example.id} className="mt-0">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CodeBlock
                        language="typescript"
                        value={example.code}
                        showLineNumbers={false}
                        allowCopy={true}
                        headerClassName="bg-primary/20 dark:bg-primary/20 py-2"
                      />
                    </motion.div>
                  </TabsContent>
                ))}
              </div>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};
