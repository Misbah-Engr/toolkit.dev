import React, { memo } from "react";

import { Handle, Position } from "@xyflow/react";

import { Card } from "@/components/ui/card";

import type { Node, NodeProps } from "@xyflow/react";
import { HStack } from "@/components/ui/stack";

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
        <Card className="size-full gap-2 p-2">
          <HStack>
            <Icon className="size-4" />
            <span>{label}</span>
          </HStack>
          <span>
            {amount.toLocaleString(undefined, {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </Card>
        <Handle
          type="source"
          position={Position.Right}
          id={Position.Right}
          className="hidden md:block"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id={Position.Bottom}
          className="block md:hidden"
        />
      </>
    );
  },
);

SourceNode.displayName = "SourceNode";
