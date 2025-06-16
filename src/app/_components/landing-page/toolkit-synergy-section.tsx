"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, GitBranch, Layers, Workflow } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { clientToolkits } from "@/toolkits/toolkits/client";
import { Toolkits } from "@/toolkits/toolkits/shared";
import { ToolkitIcons } from "@/components/toolkit/toolkit-icons";

interface SynergyExample {
  title: string;
  description: string;
  toolkits: Toolkits[];
  outcome: string;
  icon: React.ReactNode;
}

const synergyExamples: SynergyExample[] = [
  {
    title: "Comprehensive Research Pipeline",
    description: "Combine web search, GitHub analysis, and visual documentation",
    toolkits: [Toolkits.Exa, Toolkits.Github, Toolkits.Image, Toolkits.Notion],
    outcome: "Automatically research topics, analyze related code repositories, generate visual summaries, and organize everything in your knowledge base.",
    icon: <GitBranch className="h-5 w-5" />,
  },
  {
    title: "Data-Driven Decision Making",
    description: "Analyze your data with Python and create actionable insights",
    toolkits: [Toolkits.Notion, Toolkits.E2B, Toolkits.Image, Toolkits.Memory],
    outcome: "Query your databases, perform statistical analysis, generate visualizations, and remember key insights for future conversations.",
    icon: <Layers className="h-5 w-5" />,
  },
  {
    title: "Intelligent Project Management",
    description: "Coordinate tasks, meetings, and documentation seamlessly",
    toolkits: [Toolkits.GoogleCalendar, Toolkits.Notion, Toolkits.GoogleDrive, Toolkits.Memory],
    outcome: "Schedule meetings based on availability, prepare agendas from documents, track project progress, and learn your preferences over time.",
    icon: <Workflow className="h-5 w-5" />,
  },
];

const SynergyCard: React.FC<{ example: SynergyExample; delay: number }> = ({ example, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
  >
    <Card className="h-full border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg group">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
            {example.icon}
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{example.title}</CardTitle>
            <p className="text-sm text-muted-foreground mb-3">{example.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              <ToolkitIcons toolkits={example.toolkits} />
            </div>
            <div className="flex flex-wrap gap-1">
              {example.toolkits.map((toolkitId) => {
                const toolkit = clientToolkits[toolkitId];
                return (
                  <Badge key={toolkitId} variant="secondary" className="text-xs">
                    {toolkit.name}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowRight className="h-4 w-4" />
            <span className="font-medium">Outcome</span>
          </div>
          <p className="text-sm leading-relaxed pl-6">{example.outcome}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const FlowVisualization: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    viewport={{ once: true }}
    className="relative"
  >
    <div className="flex items-center justify-center gap-4 flex-wrap">
      {/* Sample toolkit flow */}
      <div className="flex items-center gap-3 bg-card border rounded-lg p-3">
        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
          <span className="text-blue-500 text-xs font-bold">1</span>
        </div>
        <span className="text-sm font-medium">Search Web</span>
      </div>
      
      <div className="hidden sm:block">
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </div>
      
      <div className="flex items-center gap-3 bg-card border rounded-lg p-3">
        <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
          <span className="text-green-500 text-xs font-bold">2</span>
        </div>
        <span className="text-sm font-medium">Analyze Code</span>
      </div>
      
      <div className="hidden sm:block">
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </div>
      
      <div className="flex items-center gap-3 bg-card border rounded-lg p-3">
        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
          <span className="text-purple-500 text-xs font-bold">3</span>
        </div>
        <span className="text-sm font-medium">Generate Visual</span>
      </div>
      
      <div className="hidden sm:block">
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </div>
      
      <div className="flex items-center gap-3 bg-card border rounded-lg p-3">
        <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
          <span className="text-orange-500 text-xs font-bold">4</span>
        </div>
        <span className="text-sm font-medium">Store Knowledge</span>
      </div>
    </div>
  </motion.div>
);

export const ToolkitSynergySection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful
            <span className="block text-primary">Toolkit Combinations</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            The real magic happens when toolkits work together. Create sophisticated workflows 
            by combining different capabilities into seamless automation pipelines.
          </p>
          
          <FlowVisualization />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {synergyExamples.map((example, index) => (
            <SynergyCard
              key={example.title}
              example={example}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="inline-block border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-2">Endless Possibilities</h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                Mix and match any toolkits to create your perfect workflow. 
                The system automatically handles the complexity of inter-toolkit communication.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <Badge variant="outline" className="text-xs">
                  {Object.keys(clientToolkits).length}+ Toolkits Available
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Infinite Combinations
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Zero Configuration
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};