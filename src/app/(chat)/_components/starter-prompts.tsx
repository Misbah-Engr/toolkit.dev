"use client";

import { motion } from "motion/react";
import { useChatContext } from "../_contexts/chat-context";

const STARTER_PROMPTS = [
  "Help me write a professional email",
  "Explain a complex topic simply",
  "Generate creative ideas for my project",
  "Review and improve my code",
];

export const StarterPrompts = () => {
  const { setInput, handleSubmit, setAttachments } = useChatContext();

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    // Trigger form submission after a small delay
    setTimeout(() => {
      handleSubmit(undefined, {
        experimental_attachments: [],
      });
      setAttachments([]);
    }, 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ delay: 0.7 }}
      className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-2 sm:grid-cols-2"
    >
      {STARTER_PROMPTS.map((prompt, index) => (
        <motion.button
          key={prompt}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.8 + index * 0.1 }}
          onClick={() => handlePromptClick(prompt)}
          className="bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-xl border p-3 text-left text-sm transition-colors"
        >
          {prompt}
        </motion.button>
      ))}
    </motion.div>
  );
};