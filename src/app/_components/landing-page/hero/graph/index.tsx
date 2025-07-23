"use client";

import React, { useEffect, useState } from "react";

import { ReactFlow, ReactFlowProvider, useReactFlow } from "@xyflow/react";

import {
  CircleDollarSign,
  Paintbrush,
  Server,
  Trophy,
  Wrench,
} from "lucide-react";

import { useTheme } from "next-themes";

import { useMediaQuery } from "usehooks-ts";

import { MeritLogo } from "@/components/ui/merit-logo";

import { ToolkitNode } from "./toolkit-node";
import { SourceNode } from "./source-node";

import { TargetNode } from "./target-node";

import type { Node, Edge } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const nodeTypes = {
  toolkit: ToolkitNode,
  source: SourceNode,
  target: TargetNode,
};

export const HeroGraph = () => {
  return (
    <div className="size-full">
      <ReactFlowProvider>
        <Graph />
      </ReactFlowProvider>
    </div>
  );
};

const sourceNodeDimensions = {
  width: 200,
  height: 72,
};

const toolkitNodeDimensions = {
  width: 100,
  height: 100,
};

const targetNodeDimensions = {
  width: 200,
  height: 72,
};

const primarySpacing = 50;
const secondarySpacing = 15;

const nodes: Node[] = [
  {
    id: "merit-sponsorship",
    type: "source",
    data: { label: "Merit Sponsorship", Icon: MeritLogo, amount: 6000 },
    position: {
      x:
        -toolkitNodeDimensions.width / 2 -
        primarySpacing -
        sourceNodeDimensions.width / 2,
      y: -sourceNodeDimensions.height - secondarySpacing,
    },
    ...sourceNodeDimensions,
  },
  {
    id: "hackathon-prize",
    type: "source",
    data: { label: "Hackathon Prize", Icon: Trophy, amount: 1000 },
    position: {
      x:
        -toolkitNodeDimensions.width / 2 -
        primarySpacing -
        sourceNodeDimensions.width / 2,
      y: 0,
    },
    ...sourceNodeDimensions,
  },
  {
    id: "revenue",
    type: "source",
    data: {
      label: "Revenue",
      Icon: CircleDollarSign,
      amount: 1000,
      comingSoon: true,
    },
    position: {
      x:
        -toolkitNodeDimensions.width / 2 -
        primarySpacing -
        sourceNodeDimensions.width / 2,
      y: sourceNodeDimensions.height + secondarySpacing,
    },
    ...sourceNodeDimensions,
  },
  {
    id: "toolkit",
    type: "toolkit",
    data: {},
    position: { x: 0, y: 0 },
    ...toolkitNodeDimensions,
  },
  {
    id: "contributor-1",
    type: "target",
    data: {
      Icon: Wrench,
      label: "Toolkit Developer",
      description: "Merged 3 new Toolkits",
    },
    position: {
      x:
        toolkitNodeDimensions.width / 2 +
        primarySpacing +
        sourceNodeDimensions.width / 2,
      y: -targetNodeDimensions.height - secondarySpacing,
    },
    ...targetNodeDimensions,
  },
  {
    id: "contributor-2",
    type: "target",
    data: {
      Icon: Server,
      label: "Backend Maintainer",
      description: "Optimized API routes",
    },
    position: {
      x:
        toolkitNodeDimensions.width / 2 +
        primarySpacing +
        sourceNodeDimensions.width / 2,
      y: 0,
    },
    ...targetNodeDimensions,
  },
  {
    id: "contributor-3",
    type: "target",
    data: {
      Icon: Paintbrush,
      label: "Product Designer",
      description: "Upgraded the UI/UX",
    },
    position: {
      x:
        toolkitNodeDimensions.width / 2 +
        primarySpacing +
        sourceNodeDimensions.width / 2,
      y: sourceNodeDimensions.height + secondarySpacing,
    },
    ...targetNodeDimensions,
  },
];

const edges: Edge[] = [
  {
    id: "e1-2",
    source: "merit-sponsorship",
    target: "toolkit",
    animated: true,
  },
  {
    id: "e2-3",
    source: "hackathon-prize",
    target: "toolkit",
    animated: true,
  },
  {
    id: "e3-4",
    source: "revenue",
    target: "toolkit",
    animated: true,
  },
  {
    id: "e4-5",
    source: "toolkit",
    target: "contributor-1",
    animated: true,
  },
  {
    id: "e5-6",
    source: "toolkit",
    target: "contributor-2",
    animated: true,
  },
  {
    id: "e6-7",
    source: "toolkit",
    target: "contributor-3",
    animated: true,
  },
  {
    id: "e7-8",
    source: "toolkit",
    target: "contributor-4",
    animated: true,
  },
];

const Graph = () => {
  const { fitView } = useReactFlow();

  const { theme } = useTheme();

  const isSmallScreen = useMediaQuery("(max-width: 479px)");
  const isMediumScreen = useMediaQuery("(max-width: 767px)");
  const isLargeScreen = useMediaQuery("(max-width: 1024px)");
  const isXLargeScreen = useMediaQuery("(max-width: 1280px)");

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    void fitView({
      padding: isSmallScreen
        ? 0.05
        : isMediumScreen
          ? 0.05
          : isLargeScreen
            ? 0.025
            : 0.025,
    });
  }, [isSmallScreen, isMediumScreen, isLargeScreen, isXLargeScreen, fitView]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      proOptions={{ hideAttribution: true }}
      colorMode={isMounted && theme === "dark" ? "dark" : "light"}
      style={{
        backgroundColor: "transparent",
        pointerEvents: "none",
      }}
      nodeOrigin={[0.5, 0.5]}
      panOnDrag={false}
      nodesDraggable={false}
      elementsSelectable={false}
      zoomOnPinch={false}
      zoomOnScroll={false}
      zoomOnDoubleClick={false}
      minZoom={0.25}
    />
  );
};
