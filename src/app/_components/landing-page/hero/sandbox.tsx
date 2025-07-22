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

import { ToolkitNode } from "./toolkit-node";

import "@xyflow/react/dist/style.css";
import { SourceNode } from "./source-node";
import { MeritLogo } from "@/components/ui/merit-logo";
import { CircleDollarSign, Trophy } from "lucide-react";
import { Section } from "../lib/section";
import { SECTIONS } from "../sections";
import { useTheme } from "next-themes";
import { useMediaQuery } from "usehooks-ts";

import type { Node, Edge } from "@xyflow/react";

const nodeTypes = {
  toolkit: ToolkitNode,
  source: SourceNode,
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

const primarySpacing = 100;
const secondarySpacing = 25;

const getNodes = (isMobile: boolean): Node[] => [
  {
    id: "merit-sponsorship",
    type: "source",
    data: { label: "Merit Sponsorship", Icon: MeritLogo, amount: 6000 },
    position: isMobile
      ? {
          x:
            -toolkitNodeDimensions.width / 2 -
            secondarySpacing -
            sourceNodeDimensions.width / 2,
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
          x:
            toolkitNodeDimensions.width / 2 +
            secondarySpacing +
            sourceNodeDimensions.width / 2,
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
];

const getEdges = (isMobile: boolean): Edge[] => [
  {
    id: "e1-2",
    source: "merit-sponsorship",
    target: "toolkit",
    animated: true,
    sourceHandle: isMobile ? Position.Bottom : Position.Right,
  },
  {
    id: "e2-3",
    source: "hackathon-prize",
    target: "toolkit",
    animated: true,
    sourceHandle: isMobile ? Position.Bottom : Position.Right,
  },
  {
    id: "e3-4",
    source: "revenue",
    target: "toolkit",
    animated: true,
    sourceHandle: isMobile ? Position.Bottom : Position.Right,
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
    void fitView();
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
    >
      <Background bgColor="transparent" />
    </ReactFlow>
  );
};
