import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Card } from "@/components/ui/card";
import { AnimatedLogo } from "@/components/ui/logo";

export const ToolkitNode: React.FC<NodeProps> = memo(() => {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Card className="size-full p-4">
        <AnimatedLogo />
      </Card>
      <Handle type="source" position={Position.Right} />
    </>
  );
});

ToolkitNode.displayName = "ToolkitNode";
