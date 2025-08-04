import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { BarChart3, Settings } from "lucide-react";
import { api } from "@/trpc/server";

import type { ClientToolkit } from "@/toolkits/types";

interface Props {
  toolkitId: string;
  toolkit: ClientToolkit;
}

export const ToolkitCard: React.FC<Props> = async ({ toolkitId, toolkit }) => {
  const usageData = await api.toolkits.getToolkitById(toolkitId);

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <Settings className="text-primary h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">
                {toolkit.name}
              </CardTitle>
              <p className="text-muted-foreground text-sm">{toolkitId}</p>
            </div>
          </div>
          <Badge variant="secondary">
            {Object.keys(toolkit.tools).length} tools
          </Badge>
        </div>
      </CardHeader>

      {usageData ? (
        <CardContent className="space-y-4">
          {/* Usage Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-primary text-2xl font-bold">
                {usageData.tools.reduce(
                  (acc, tool) => acc + tool.usageCount,
                  0,
                )}
              </div>
              <div className="text-muted-foreground text-xs">Total Uses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {Object.keys(toolkit.tools).length}
              </div>
              <div className="text-muted-foreground text-xs">Tools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {Object.keys(toolkit.tools).length}
              </div>
              <div className="text-muted-foreground text-xs">Available</div>
            </div>
          </div>

          {/* Top Tools */}
          {usageData.tools.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <BarChart3 className="h-4 w-4" />
                Top Tools
              </div>
              <div className="space-y-1">
                {usageData.tools.slice(0, 3).map((tool) => (
                  <div
                    key={tool.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="truncate">{tool.id}</span>
                    <Badge variant="outline" className="text-xs">
                      {tool.usageCount} uses
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      ) : null}
    </Card>
  );
};
