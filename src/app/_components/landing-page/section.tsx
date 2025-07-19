import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<Props> = ({ id, className, children }) => {
  return (
    <section id={id} className={cn("px-2 py-4 md:px-16 md:py-16", className)}>
      {children}
    </section>
  );
};
