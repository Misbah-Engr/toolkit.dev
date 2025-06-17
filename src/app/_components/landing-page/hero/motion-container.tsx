"use client";

import { motion } from "motion/react";

export const MotionContainer = ({
  children,
  initial = { opacity: 0, y: 30 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.6 },
  className,
}: {
  children: React.ReactNode;
  initial?: {
    opacity: number;
    y: number;
  };
  animate?: {
    opacity: number;
    y: number;
  };
  transition?: {
    duration: number;
  };
  className?: string;
}) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};
