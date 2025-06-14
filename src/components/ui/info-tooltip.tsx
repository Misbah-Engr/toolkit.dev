import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

interface Props {
  content: string;
  className?: string;
  contentClassName?: string;
}

export const InfoTooltip: React.FC<Props> = ({
  content,
  className,
  contentClassName,
}) => (
  <TooltipProvider delayDuration={100}>
    <Tooltip>
      <TooltipTrigger>
        <div
          className={cn(
            "text-muted-foreground hover:text-foreground size-5 transition-colors",
            className,
          )}
        >
          <Info className="size-full" />
        </div>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        className={cn("max-w-[200px] text-center", contentClassName)}
      >
        {content}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
