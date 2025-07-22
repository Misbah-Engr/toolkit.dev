import React from "react";

import { HStack } from "@/components/ui/stack";
import { MeritLogo } from "@/components/ui/merit-logo";

export const Banner: React.FC = () => {
  return (
    <div className="bg-primary/10 border-primary/60 w-full border-y py-2 text-center text-sm">
      <HStack className="mx-auto w-fit">
        <MeritLogo className="size-4" />
        <span className="text-primary font-bold">
          $6,000 available for contributors on Merit Systems
        </span>
        <span className="decoration-primary/60 decoration-1.5 underline underline-offset-3">
          Learn More
        </span>
      </HStack>
    </div>
  );
};
