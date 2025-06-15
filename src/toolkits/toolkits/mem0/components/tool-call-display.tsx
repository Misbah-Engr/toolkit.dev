import React from "react";
import { type LucideIcon } from "lucide-react";

interface ToolCallDisplayProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function ToolCallDisplay({
  icon: Icon,
  label,
  value,
}: ToolCallDisplayProps) {
  return (
    <div className="bg-muted flex items-center gap-2 rounded-md p-2">
      <Icon className="text-muted-foreground h-4 w-4" />
      <span className="text-muted-foreground text-sm font-medium">
        {label}:
      </span>
      <span className="text-sm">{value}</span>
    </div>
  );
}
