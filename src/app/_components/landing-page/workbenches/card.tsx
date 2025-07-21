import { Card, CardTitle, CardHeader } from "@/components/ui/card";

import type { WorkbenchExample } from "./types";
import { clientToolkits } from "@/toolkits/toolkits/client";
import { ToolkitIcon } from "@/components/toolkit/toolkit-icons";
import { HStack } from "@/components/ui/stack";

export const WorkbenchCard: React.FC<{
  workbench: WorkbenchExample;
}> = ({ workbench }) => {
  return (
    <Card className="border-border/50 hover:border-primary/20 hover:shadow-l h-full gap-2 p-2 transition-all duration-300">
      <CardHeader className="p-0">
        <CardTitle className="flex items-center gap-3 text-lg">
          <workbench.icon className="text-primary size-5" />
          <h3 className="text-lg font-bold">{workbench.title}</h3>
        </CardTitle>
      </CardHeader>
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground border-muted border-l-2 pl-3 text-xs italic">
          &ldquo;{workbench.systemPrompt}&rdquo;
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {workbench.toolkits.map((toolkit) => {
          const clientToolkit = clientToolkits[toolkit];
          return (
            <HStack key={toolkit}>
              <ToolkitIcon toolkit={toolkit} className="size-5" />
              {clientToolkit.name}
            </HStack>
          );
        })}
      </div>
    </Card>
  );
};
