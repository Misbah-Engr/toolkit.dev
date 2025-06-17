import { motion } from "motion/react";
import type { WorkbenchExample } from "./types";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { WorkbenchVisualization } from "./graphic";
import { VStack } from "@/components/ui/stack";

export const WorkbenchCard: React.FC<{
  workbench: WorkbenchExample;
  delay: number;
}> = ({ workbench, delay }) => {
  const cardColorClasses = {
    blue: "bg-blue-100 dark:bg-blue-900",
    green: "bg-green-100 dark:bg-green-900",
    purple: "bg-purple-100 dark:bg-purple-900",
  };

  const cardColors =
    cardColorClasses[workbench.color as keyof typeof cardColorClasses];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="border-border/50 hover:border-primary/20 hover:shadow-l h-full gap-2 p-2 transition-all duration-300">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className={`rounded-lg ${cardColors} p-2`}>
              {workbench.icon}
            </div>
            <VStack className="items-start gap-0">
              <h3 className="text-lg font-bold">{workbench.title}</h3>
              <p className="text-muted-foreground text-sm">
                {workbench.description}
              </p>
            </VStack>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          {/* System Prompt Preview */}
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-medium">System Prompt</h4>
            <p className="text-muted-foreground border-muted border-l-2 pl-3 text-xs italic">
              &ldquo;{workbench.systemPrompt}&rdquo;
            </p>
          </div>
          <WorkbenchVisualization workbench={workbench} />
        </CardContent>
      </Card>
    </motion.div>
  );
};
