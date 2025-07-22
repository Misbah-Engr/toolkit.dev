"use client";

import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { HStack, VStack } from "@/components/ui/stack";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface Props {
  title: [string, string];
  description: string;
  buttons?: React.ReactNode[];
  className?: string;
}

export const Heading: React.FC<Props> = ({
  title,
  description,
  buttons,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={cn("flex flex-col items-start gap-2 text-left", className)}
    >
      <h2 className="text-2xl font-bold md:text-3xl">
        {title[0]}
        <span className="text-primary block">{title[1]}</span>
      </h2>
      <p className="text-muted-foreground max-w-2xl text-sm md:text-lg">
        {description}
      </p>
      {buttons && (
        <HStack className="mt-2">{buttons.map((button) => button)}</HStack>
      )}
    </motion.div>
  );
};

interface MiniHeadingProps {
  title: string;
  className?: string;
}

export const MiniHeading: React.FC<MiniHeadingProps> = ({
  title,
  className,
}) => {
  return (
    <VStack className={cn("relative px-2 py-4 md:py-8", className)}>
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full opacity-20"
        flickerChance={0.1}
      />
      <h2 className="text-primary text-xl font-bold md:text-2xl">{title}</h2>
    </VStack>
  );
};
