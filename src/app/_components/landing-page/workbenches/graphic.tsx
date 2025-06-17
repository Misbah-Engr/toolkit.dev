import { clientToolkits } from "@/toolkits/toolkits/client";
import type { Toolkits } from "@/toolkits/toolkits/shared";
import { createRef, useRef } from "react";
import type { WorkbenchExample } from "./types";
import { AnimatedBeam } from "@/components/magicui/animated-beam";

export const WorkbenchVisualization: React.FC<{
  workbench: WorkbenchExample;
}> = ({ workbench }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const toolkitRefs = workbench.toolkits.map(() => createRef<HTMLDivElement>());

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
          {workbench.icon}
        </div>
      </div>

      {/* Toolkit Nodes arranged in a circle */}
      {workbench.toolkits.map((toolkit, index) => {
        const angle = (index / workbench.toolkits.length) * 2 * Math.PI;
        const radius = 145;
        // Offset the angle by PI/2 to rotate the circle so no nodes are directly above/below
        const offsetAngle = angle + Math.PI / 6;
        const x = Math.cos(offsetAngle) * radius;
        const y = Math.sin(offsetAngle) * radius;

        return (
          <div
            key={toolkit}
            className="absolute z-5 -translate-x-1/2 -translate-y-1/2 transform"
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
          curvature={45}
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
      className={`relative rounded-lg border-2 ${colors.border} ${colors.bg} p-2 shadow-sm transition-all hover:shadow-md`}
    >
      <div className="flex items-center gap-2">
        <div className={`rounded-md ${colors.iconBg} p-1.5`}>
          <IconComponent className={`h-4 w-4 ${colors.iconColor}`} />
        </div>
        <span className="text-xs font-medium whitespace-nowrap">
          {clientToolkit.name}
        </span>
      </div>
    </div>
  );
};
