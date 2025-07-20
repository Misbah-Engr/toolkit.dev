"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { ToolkitIcon } from "@/components/toolkit/toolkit-icons";

import { Toolkits } from "@/toolkits/toolkits/shared";
import { MessageSquare } from "lucide-react";

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
  x: "0%",
  y: "0%",
  scale: 0.5,
  rotate: -180,
  opacity: 0,
};

const commonProps = (index: number) => ({
  scale: 1,
  rotate: 0,
  opacity: 1,
  transition: {
    type: "spring",
    stiffness: 200,
    damping: 20,
    delay: index * 0.1,
  },
});

const offset = 100 * Math.sqrt(2);

// Animation variants for the three positions
const iconVariants = {
  initial: initialProps,
  topLeft: {
    x: `-${offset}%`,
    y: `-${offset}%`,
    ...commonProps(0),
  },
  topRight: {
    x: `${offset}%`,
    y: `-${offset}%`,
    ...commonProps(1),
  },
  bottomLeft: {
    x: `-${offset}%`,
    y: `${offset}%`,
    ...commonProps(2),
  },
  bottomRight: {
    x: `${offset}%`,
    y: `${offset}%`,
    ...commonProps(3),
  },
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
    <div className="relative flex aspect-square w-full items-center justify-center">
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
          <Toolkit toolkit={currentToolkits[0]} animate="topLeft" />
          <Toolkit toolkit={currentToolkits[1]} animate="bottomLeft" />
          <Toolkit toolkit={currentToolkits[2]} animate="topRight" />
          <Toolkit toolkit={currentToolkits[3]} animate="bottomRight" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Toolkit = ({
  toolkit,
  animate,
}: {
  toolkit: Toolkits;
  animate: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
}) => {
  return (
    <motion.div
      className="bg-card border-primary absolute rounded-full border p-3 shadow-sm"
      variants={iconVariants}
      initial="initial"
      animate={animate}
      exit="exit"
    >
      <ToolkitIcon toolkit={toolkit} iconClassName="size-6 md:size-8" />
    </motion.div>
  );
};
