"use client";

import React, { useEffect, useState } from "react";

import {
  ReactFlow,
  Background,
  ReactFlowProvider,
  useReactFlow,
  useNodesState,
  useEdgesState,
  Position,
} from "@xyflow/react";

import {
  CircleDollarSign,
  GitPullRequest,
  Paintbrush,
  Server,
  Trophy,
  Wrench,
} from "lucide-react";

import { useTheme } from "next-themes";

import { useMediaQuery } from "usehooks-ts";

import { MeritLogo } from "@/components/ui/merit-logo";

import { Section } from "../lib/section";
import { SECTIONS } from "../sections";

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

export const GraphHeroSection = () => {
  return (
    <Section id={SECTIONS.Hero} className="h-[60vh] p-0 md:p-0">
      <ReactFlowProvider>
        <Graph />
      </ReactFlowProvider>
    </Section>
  );
};

const sourceNodeDimensions = {
  width: 200,
  height: 72,
};

const toolkitNodeDimensions = {
  width: 200,
  height: 200,
};

const targetNodeDimensions = {
  width: 200,
  height: 72,
};

const primarySpacing = 100;
const secondarySpacing = 25;

const getNodes = (isMobile: boolean): Node[] => [
  {
    id: "merit-sponsorship",
    type: "source",
    data: { label: "Merit Sponsorship", Icon: MeritLogo, amount: 6000 },
    position: isMobile
      ? {
          x: -secondarySpacing - sourceNodeDimensions.width,
          y: -toolkitNodeDimensions.height / 2 - primarySpacing,
        }
      : {
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
    position: isMobile
      ? {
          x: 0,
          y: -toolkitNodeDimensions.height / 2 - primarySpacing,
        }
      : {
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
    position: isMobile
      ? {
          x: secondarySpacing + sourceNodeDimensions.width,
          y: -toolkitNodeDimensions.height / 2 - primarySpacing,
        }
      : {
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
    position: isMobile
      ? {
          x: (-targetNodeDimensions.width * 3) / 2 - (secondarySpacing * 3) / 2,
          y: toolkitNodeDimensions.height / 2 + primarySpacing,
        }
      : {
          x:
            toolkitNodeDimensions.width / 2 +
            primarySpacing +
            sourceNodeDimensions.width / 2,
          y:
            (-targetNodeDimensions.height * 3) / 2 - (secondarySpacing * 3) / 2,
        },
    ...targetNodeDimensions,
  },
  {
    id: "contributor-2",
    type: "target",
    data: {
      Icon: Server,
      label: "Backend Maintainer",
      description: "Optimized API performance",
    },
    position: isMobile
      ? {
          x: -targetNodeDimensions.width / 2 - secondarySpacing / 2,
          y: toolkitNodeDimensions.height / 2 + primarySpacing,
        }
      : {
          x:
            toolkitNodeDimensions.width / 2 +
            primarySpacing +
            sourceNodeDimensions.width / 2,
          y: -sourceNodeDimensions.height / 2 - secondarySpacing / 2,
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
    position: isMobile
      ? {
          x: targetNodeDimensions.width / 2 + secondarySpacing / 2,
          y: toolkitNodeDimensions.height / 2 + primarySpacing,
        }
      : {
          x:
            toolkitNodeDimensions.width / 2 +
            primarySpacing +
            sourceNodeDimensions.width / 2,
          y: sourceNodeDimensions.height / 2 + secondarySpacing / 2,
        },
    ...targetNodeDimensions,
  },
  {
    id: "contributor-4",
    type: "target",
    data: {
      Icon: GitPullRequest,
      label: "PR Reviewer",
      description: "Reviewed 62 PRs",
    },
    position: isMobile
      ? {
          x: (targetNodeDimensions.width * 3) / 2 + (secondarySpacing * 3) / 2,
          y: toolkitNodeDimensions.height / 2 + primarySpacing,
        }
      : {
          x:
            toolkitNodeDimensions.width / 2 +
            primarySpacing +
            sourceNodeDimensions.width / 2,
          y: (sourceNodeDimensions.height * 3) / 2 + (secondarySpacing * 3) / 2,
        },
    ...targetNodeDimensions,
  },
];

const getEdges = (isMobile: boolean): Edge[] => [
  {
    id: "e1-2",
    source: "merit-sponsorship",
    target: "toolkit",
    animated: true,
    sourceHandle: isMobile ? Position.Bottom : Position.Right,
    targetHandle: isMobile ? Position.Top : Position.Left,
  },
  {
    id: "e2-3",
    source: "hackathon-prize",
    target: "toolkit",
    animated: true,
    sourceHandle: isMobile ? Position.Bottom : Position.Right,
    targetHandle: isMobile ? Position.Top : Position.Left,
  },
  {
    id: "e3-4",
    source: "revenue",
    target: "toolkit",
    animated: true,
    sourceHandle: isMobile ? Position.Bottom : Position.Right,
    targetHandle: isMobile ? Position.Top : Position.Left,
  },
  {
    id: "e4-5",
    source: "toolkit",
    target: "contributor-1",
    animated: true,
    sourceHandle: isMobile ? Position.Bottom : Position.Right,
    targetHandle: isMobile ? Position.Top : Position.Left,
  },
  {
    id: "e5-6",
    source: "toolkit",
    target: "contributor-2",
    animated: true,
    sourceHandle: isMobile ? Position.Bottom : Position.Right,
    targetHandle: isMobile ? Position.Top : Position.Left,
  },
  {
    id: "e6-7",
    source: "toolkit",
    target: "contributor-3",
    animated: true,
    sourceHandle: isMobile ? Position.Bottom : Position.Right,
    targetHandle: isMobile ? Position.Top : Position.Left,
  },
  {
    id: "e7-8",
    source: "toolkit",
    target: "contributor-4",
    animated: true,
    sourceHandle: isMobile ? Position.Bottom : Position.Right,
    targetHandle: isMobile ? Position.Top : Position.Left,
  },
];

const Graph = () => {
  const { fitView } = useReactFlow();

  const { theme } = useTheme();

  const isMobile = useMediaQuery("(max-width: 768px)");

  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [nodes, setNodes] = useNodesState(getNodes(isMobile));
  const [edges, setEdges] = useEdgesState(getEdges(isMobile));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsVisible(false);
    setNodes(getNodes(isMobile));
    setEdges(getEdges(isMobile));
  }, [isMobile, setNodes, setEdges]);

  useEffect(() => {
    void fitView({
      padding: 10,
    });
    setIsVisible(true);
  }, [nodes, fitView]);

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
        opacity: isVisible ? 1 : 0,
      }}
      nodeOrigin={[0.5, 0.5]}
      panOnDrag={false}
      nodesDraggable={false}
      elementsSelectable={false}
      zoomOnPinch={false}
      zoomOnScroll={false}
      zoomOnDoubleClick={false}
    >
      <Background bgColor="transparent" />
    </ReactFlow>
  );
};
