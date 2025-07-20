"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { ToolkitIcon } from "@/components/toolkit/toolkit-icons";

import { Toolkits } from "@/toolkits/toolkits/shared";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const toolkitSets = [
  [Toolkits.Exa, Toolkits.Github, Toolkits.Notion, Toolkits.GoogleCalendar],
  [
    Toolkits.Image,
    Toolkits.GoogleCalendar,
    Toolkits.Memory,
    Toolkits.GoogleDrive,
  ],
  [Toolkits.GoogleDrive, Toolkits.E2B, Toolkits.Exa, Toolkits.Github],
  [Toolkits.Github, Toolkits.Image, Toolkits.GoogleCalendar, Toolkits.Memory],
] as const;

const DURATION = 5000;

const initialProps = {
  top: "50%",
  left: "50%",
  scale: 0.5,
  rotate: -180,
  opacity: 0,
};

// Animation variants for the three positions
const iconVariants = {
  initial: initialProps,
  spread: (index: number) => ({
    scale: 1,
    rotate: 0,
    opacity: 1,
    top: index < 2 ? `0%` : `100%`,
    left: index % 2 === 0 ? `0%` : `100%`,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      delay: index * 0.1,
    },
  }),
  exit: {
    ...initialProps,
    transition: {
      ease: "easeInOut",
      duration: 0.3,
    },
  },
};

export const ToggleTools = () => {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSetIndex((prev) => (prev + 1) % toolkitSets.length);
    }, DURATION); // Increased time to allow for animations

    return () => clearInterval(interval);
  }, []);

  const currentToolkits = toolkitSets[currentSetIndex]!;

  return (
    <div className="relative flex size-full items-center justify-center">
      {/* SVG Lines */}

      <div className="bg-card absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border p-6 shadow-sm">
        <MessageSquare className="size-12" />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSetIndex}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentToolkits.map((toolkit, index) => (
            <Toolkit toolkit={toolkit} index={index} key={index} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Toolkit = ({ toolkit, index }: { toolkit: Toolkits; index: number }) => {
  return (
    <motion.div
      className={cn(
        "bg-card border-primary absolute rounded-full border p-3 shadow-sm",
        index % 2 === 1 && "-translate-x-1/1",
        index > 1 && "-translate-y-1/1",
      )}
      variants={iconVariants}
      initial="initial"
      animate={"spread"}
      exit="exit"
      custom={index}
    >
      <ToolkitIcon toolkit={toolkit} iconClassName="size-6 md:size-8" />
    </motion.div>
  );
};
