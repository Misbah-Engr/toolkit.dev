import React from "react";
import { Search, Star } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import type { baseSearchMemoriesTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { ToolCallDisplay } from "../../components/tool-call-display";

export const mem0SearchMemoriesToolConfigClient: ClientToolConfig<
  typeof baseSearchMemoriesTool.inputSchema.shape,
  typeof baseSearchMemoriesTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <ToolCallDisplay
        icon={Search}
        label="Searching Memories"
        value={args.query ?? "..."}
      />
    );
  },
  ResultComponent: ({ result }) => {
    const { memories } = result;

    if (memories.length === 0) {
      return <div className="text-muted-foreground">No memories found</div>;
    }

    return (
      <Accordion type="single" collapsible>
        <AccordionItem value="memories">
          <AccordionTrigger className="cursor-pointer p-0 hover:no-underline">
            <h3 className="text-primary flex items-center gap-2 text-sm font-medium">
              Found {memories.length} Memor{memories.length === 1 ? "y" : "ies"}
            </h3>
          </AccordionTrigger>
          <AccordionContent className="p-0">
            {memories.map((memory, index) => (
              <div
                className="border-b py-2 last:border-b-0 last:pb-0"
                key={index}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="flex-1 text-sm">{memory.memory}</p>
                  <div className="text-muted-foreground flex items-center gap-1 text-xs">
                    <Star className="h-3 w-3" />
                    <span>{(memory.score * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  },
};
