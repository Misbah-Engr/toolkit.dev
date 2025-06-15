"use client";

import { motion } from "motion/react";
import { MultimodalInput } from "./input";
import { StarterPrompts } from "./starter-prompts";

interface Props {
  chatId: string;
  isAtBottom: boolean;
  scrollToBottom: () => void;
}

export const WelcomeState = ({ chatId, isAtBottom, scrollToBottom }: Props) => {
  return (
    <motion.div
      key="welcome-state"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex h-full flex-col items-center justify-center px-4"
    >
      <div className="mx-auto w-full max-w-3xl">
        {/* Greeting Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="mb-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="text-3xl font-semibold md:text-4xl"
          >
            Hello there!
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="mt-2 text-xl text-zinc-500 md:text-2xl"
          >
            How can I help you today?
          </motion.div>
        </motion.div>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="mx-auto w-full max-w-2xl"
        >
          <MultimodalInput
            chatId={chatId}
            isAtBottom={isAtBottom}
            scrollToBottom={scrollToBottom}
          />
        </motion.div>

        {/* Starter Prompts */}
        <StarterPrompts />
      </div>
    </motion.div>
  );
};