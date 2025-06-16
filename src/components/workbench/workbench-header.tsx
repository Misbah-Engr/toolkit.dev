"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface WorkbenchHeaderProps {
  workbench: {
    id: string;
    name: string;
    toolkitIds: string[];
  };
}

export function WorkbenchHeader({ workbench }: WorkbenchHeaderProps) {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/workbenches">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          
          <div className="flex items-center gap-3">
            <h1 className="font-semibold text-lg">{workbench.name}</h1>
            
            {workbench.toolkitIds.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {workbench.toolkitIds.slice(0, 3).map((toolkitId) => (
                  <Badge key={toolkitId} variant="secondary" className="text-xs">
                    {toolkitId}
                  </Badge>
                ))}
                {workbench.toolkitIds.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{workbench.toolkitIds.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
        
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/workbenches/${workbench.id}/edit`}>
            <Settings className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}