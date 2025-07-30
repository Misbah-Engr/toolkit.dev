import React from "react";
import type { LucideIcon } from "lucide-react";

interface ToolCallDisplayProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export const ToolCallDisplay: React.FC<ToolCallDisplayProps> = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="bg-muted/50 flex items-center space-x-2 rounded-md p-2">
      <Icon className="text-muted-foreground h-4 w-4" />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-muted-foreground truncate text-xs">{value}</div>
      </div>
    </div>
  );
};
