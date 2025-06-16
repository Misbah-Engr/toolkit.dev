"use client";

import { Button } from "@/components/ui/button";
import { getClientToolkit } from "@/toolkits/toolkits/client";
import type { Toolkits } from "@/toolkits/toolkits/shared";
import type { Workbench } from "@prisma/client";
import { Settings, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface WorkbenchHeaderProps {
  workbench: Workbench;
}

export function WorkbenchHeader({ workbench }: WorkbenchHeaderProps) {
  return (
    <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/workbenches">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>

          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold">{workbench.name}</h1>

            {workbench.toolkitIds.length > 0 && (
              <div className="flex pl-2">
                {workbench.toolkitIds.slice(0, 3).map((toolkitId) => {
                  const toolkit = getClientToolkit(toolkitId as Toolkits);
                  return (
                    <toolkit.icon key={toolkitId} className="-ml-2 size-4" />
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <Button variant="ghost" size="sm" asChild>
          <Link href={`/workbenches/${workbench.id}/edit`}>
            <Settings className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
