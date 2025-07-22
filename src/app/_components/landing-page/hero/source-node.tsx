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
  amount: number;
  comingSoon?: boolean;
};

export const SourceNode: React.FC<NodeProps<Node<SourceNodeData>>> = memo(
  ({ data }) => {
    const { Icon, label, amount } = data;

    return (
      <>
        <Card className="size-full justify-center gap-1 p-2">
          <HStack>
            <Icon className="size-4" />
            <span className="font-semibold">{label}</span>
          </HStack>
          <span className="text-primary text-sm font-bold">
            {amount.toLocaleString(undefined, {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </Card>
        <Handle
          type="source"
          position={Position.Right}
          className="hidden md:block"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className="block md:hidden"
        />
      </>
    );
  },
);

SourceNode.displayName = "SourceNode";
