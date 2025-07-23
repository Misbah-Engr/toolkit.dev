import { Handle as BaseHandle, type Position } from "@xyflow/react";

import { cn } from "@/lib/utils";

interface Props {
  type: "target" | "source";
  position: Position;
  className?: string;
}

export const Handle: React.FC<Props> = ({ type, position, className }) => {
  return (
    <BaseHandle
      type={type}
      position={position}
      id={position}
      className={cn(className)}
    />
  );
};
