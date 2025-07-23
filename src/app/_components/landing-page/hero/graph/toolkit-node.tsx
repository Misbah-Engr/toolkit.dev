import React, { memo } from "react";

import { Position } from "@xyflow/react";

import { Card } from "@/components/ui/card";
import { AnimatedLogo } from "@/components/ui/logo";

import { Handle } from "./handle";

import type { NodeProps } from "@xyflow/react";

export const ToolkitNode: React.FC<NodeProps> = memo(() => {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Card className="size-full p-4">
        <AnimatedLogo className="size-full" />
      </Card>
      <Handle type="source" position={Position.Right} />
    </>
  );
});

ToolkitNode.displayName = "ToolkitNode";
