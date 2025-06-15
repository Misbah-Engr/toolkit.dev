import React from "react";
import { LucideIcon } from "lucide-react";

interface ToolCallDisplayProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function ToolCallDisplay({ icon: Icon, label, value }: ToolCallDisplayProps) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm font-medium text-muted-foreground">{label}:</span>
      <span className="text-sm">{value}</span>
    </div>
  );
}