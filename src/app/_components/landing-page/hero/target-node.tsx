import React, { memo } from "react";

import { Position } from "@xyflow/react";

import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/stack";

import { Handle } from "./handle";

import type { Node, NodeProps } from "@xyflow/react";

type SourceNodeData = {
  Icon: React.FC<{ className?: string }>;
  label: string;
  description: string;
};

export const TargetNode: React.FC<NodeProps<Node<SourceNodeData>>> = memo(
  ({ data }) => {
    const { Icon, label, description } = data;

    return (
      <>
        <Handle
          type="target"
          position={Position.Top}
          className="block md:hidden"
        />
        <Handle
          type="target"
          position={Position.Left}
          className="hidden md:block"
        />
        <Card className="size-full gap-1 p-2">
          <HStack>
            <Icon className="size-4" />
            <span className="font-bold">{label}</span>
          </HStack>
          <p className="text-sm">{description}</p>
        </Card>
      </>
    );
  },
);

TargetNode.displayName = "TargetNode";
