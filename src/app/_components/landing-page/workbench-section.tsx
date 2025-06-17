"use client";

import React, { useRef } from "react";
import { motion } from "motion/react";
import { Briefcase, Code, BarChart3, PenTool } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { clientToolkits } from "@/toolkits/toolkits/client";
import { Toolkits } from "@/toolkits/toolkits/shared";
import { AnimatedBeam } from "@/components/magicui/animated-beam";

interface WorkbenchExample {
  title: string;
  description: string;
  systemPrompt: string;
  toolkits: Toolkits[];
  icon: React.ReactNode;
  color: string;
}

const workbenchExamples: WorkbenchExample[] = [
  {
    title: "Research Assistant",
    description: "Comprehensive research and documentation workbench",
    systemPrompt:
      "You are a research assistant that helps users gather, analyze, and document information from multiple sources.",
    toolkits: [
      Toolkits.Exa,
      Toolkits.Github,
      Toolkits.Image,
      Toolkits.Notion,
      Toolkits.Memory,
    ],
    icon: <BarChart3 className="h-5 w-5" />,
    color: "blue",
  },
  {
    title: "Data Analyst",
    description: "Data processing and visualization workbench",
    systemPrompt:
      "You are a data analyst specializing in extracting insights from various data sources and creating compelling visualizations.",
    toolkits: [
      Toolkits.Notion,
      Toolkits.GoogleDrive,
      Toolkits.E2B,
      Toolkits.Image,
    ],
    icon: <Code className="h-5 w-5" />,
    color: "green",
  },
  {
    title: "Project Manager",
    description: "Team coordination and project management workbench",
    systemPrompt:
      "You are a project manager focused on coordinating teams, scheduling meetings, and tracking project progress.",
    toolkits: [
      Toolkits.GoogleCalendar,
      Toolkits.Notion,
      Toolkits.GoogleDrive,
      Toolkits.Memory,
    ],
    icon: <Briefcase className="h-5 w-5" />,
    color: "purple",
  },
];

const ToolkitNode: React.FC<{
  toolkit: Toolkits;
  nodeRef: React.RefObject<HTMLDivElement>;
  color: string;
}> = ({ toolkit, nodeRef, color }) => {
  const clientToolkit = clientToolkits[toolkit];
  const IconComponent = clientToolkit.icon;

  const colorClasses = {
    blue: {
      border: "border-blue-200 dark:border-blue-800",
      bg: "bg-blue-50 dark:bg-blue-950",
      iconBg: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    green: {
      border: "border-green-200 dark:border-green-800",
      bg: "bg-green-50 dark:bg-green-950",
      iconBg: "bg-green-100 dark:bg-green-900",
      iconColor: "text-green-600 dark:text-green-400",
    },
    purple: {
      border: "border-purple-200 dark:border-purple-800",
      bg: "bg-purple-50 dark:bg-purple-950",
      iconBg: "bg-purple-100 dark:bg-purple-900",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  };

  const colors = colorClasses[color as keyof typeof colorClasses];

  return (
    <div
      ref={nodeRef}
      className={`relative rounded-lg border-2 ${colors.border} ${colors.bg} p-3 shadow-sm transition-all hover:shadow-md`}
    >
      <div className="flex items-center gap-2">
        <div className={`rounded-md ${colors.iconBg} p-1.5`}>
          <IconComponent className={`h-4 w-4 ${colors.iconColor}`} />
        </div>
        <span className="text-sm font-medium">{clientToolkit.name}</span>
      </div>
    </div>
  );
};

const WorkbenchVisualization: React.FC<{ workbench: WorkbenchExample }> = ({
  workbench,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const toolkitRefs = workbench.toolkits.map(() =>
    React.createRef<HTMLDivElement>(),
  );

  const centerColorClasses = {
    blue: {
      border: "border-blue-300 dark:border-blue-700",
      bg: "bg-blue-100 dark:bg-blue-900",
      iconBg: "bg-blue-200 dark:bg-blue-800",
    },
    green: {
      border: "border-green-300 dark:border-green-700",
      bg: "bg-green-100 dark:bg-green-900",
      iconBg: "bg-green-200 dark:bg-green-800",
    },
    purple: {
      border: "border-purple-300 dark:border-purple-700",
      bg: "bg-purple-100 dark:bg-purple-900",
      iconBg: "bg-purple-200 dark:bg-purple-800",
    },
  };

  const centerColors =
    centerColorClasses[workbench.color as keyof typeof centerColorClasses];

  return (
    <div className="relative h-80 w-full" ref={containerRef}>
      {/* Central Workbench Node */}
      <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform">
        <div
          ref={centerRef}
          className={`rounded-xl border-2 ${centerColors.border} ${centerColors.bg} p-4 shadow-lg`}
        >
          <div className="flex items-center gap-3">
            <div className={`rounded-lg ${centerColors.iconBg} p-2`}>
              {workbench.icon}
            </div>
            <div>
              <h4 className="text-sm font-semibold">{workbench.title}</h4>
              <p className="text-muted-foreground text-xs">Workbench</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolkit Nodes arranged in a circle */}
      {workbench.toolkits.map((toolkit, index) => {
        const angle = (index / workbench.toolkits.length) * 2 * Math.PI;
        const radius = 120;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <div
            key={toolkit}
            className="absolute -translate-x-1/2 -translate-y-1/2 transform"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
            }}
          >
            <ToolkitNode
              toolkit={toolkit}
              nodeRef={toolkitRefs[index] as React.RefObject<HTMLDivElement>}
              color={workbench.color}
            />
          </div>
        );
      })}

      {/* Animated Beams connecting toolkits to center */}
      {toolkitRefs.map((ref, index) => (
        <AnimatedBeam
          key={index}
          containerRef={containerRef}
          fromRef={ref}
          toRef={centerRef}
          curvature={30}
          duration={3 + Math.random()}
          delay={index * 0.3}
          pathOpacity={0.4}
          gradientStartColor={
            workbench.color === "blue"
              ? "#3b82f6"
              : workbench.color === "green"
                ? "#10b981"
                : "#8b5cf6"
          }
          gradientStopColor={
            workbench.color === "blue"
              ? "#1d4ed8"
              : workbench.color === "green"
                ? "#059669"
                : "#7c3aed"
          }
        />
      ))}
    </div>
  );
};

const WorkbenchCard: React.FC<{
  workbench: WorkbenchExample;
  delay: number;
}> = ({ workbench, delay }) => {
  const cardColorClasses = {
    blue: "bg-blue-100 dark:bg-blue-900",
    green: "bg-green-100 dark:bg-green-900",
    purple: "bg-purple-100 dark:bg-purple-900",
  };

  const cardColors =
    cardColorClasses[workbench.color as keyof typeof cardColorClasses];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="border-border/50 hover:border-primary/20 h-full transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className={`rounded-lg ${cardColors} p-2`}>
              {workbench.icon}
            </div>
            {workbench.title}
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            {workbench.description}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* System Prompt Preview */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">System Prompt</h4>
            <p className="text-muted-foreground border-muted border-l-2 pl-3 text-xs italic">
              &ldquo;{workbench.systemPrompt}&rdquo;
            </p>
          </div>

          {/* Toolkit Badges */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Included Toolkits</h4>
            <div className="flex flex-wrap gap-1">
              {workbench.toolkits.map((toolkitId) => {
                const toolkit = clientToolkits[toolkitId];
                return (
                  <Badge
                    key={toolkitId}
                    variant="secondary"
                    className="text-xs"
                  >
                    {toolkit.name}
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* Visualization */}
          <div className="mt-4">
            <h4 className="mb-2 text-sm font-medium">Toolkit Connections</h4>
            <div className="bg-muted/20 rounded-lg border p-2">
              <WorkbenchVisualization workbench={workbench} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const WorkbenchSection: React.FC = () => {
  return (
    <section className="from-muted/20 to-background bg-gradient-to-b py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Powerful
            <span className="text-primary block">Workbench Configurations</span>
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
            Workbenches combine multiple toolkits with specialized system
            prompts to create focused AI assistants for specific use cases. Each
            workbench orchestrates toolkit interactions seamlessly.
          </p>
        </motion.div>

        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {workbenchExamples.map((workbench, index) => (
            <WorkbenchCard
              key={workbench.title}
              workbench={workbench}
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
          <Card className="border-primary/20 from-primary/5 to-primary/10 inline-block bg-gradient-to-r">
            <CardContent className="p-8">
              <div className="mb-4 flex items-center justify-center">
                <div className="bg-primary/10 rounded-full p-3">
                  <PenTool className="text-primary h-6 w-6" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Create Custom Workbenches
              </h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                Build your own specialized AI assistants by combining any
                toolkits with custom system prompts tailored to your workflow.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Drag & Drop Builder
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Custom System Prompts
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Unlimited Combinations
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
