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
  const { append } = useChatContext();

  const handlePromptClick = (prompt: string) => {
    void append({
      role: "user",
      content: prompt,
    });
  };

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-2 sm:grid-cols-2">
      {STARTER_PROMPTS.map((prompt, index) => (
        <motion.button
          key={prompt}
          initial={{ opacity: 0, y: 10, height: "auto" }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: 10, height: 0 }}
          transition={{
            enter: { delay: 0.1 + index * 0.1 },
            exit: { delay: 0, duration: 0.1 },
          }}
          onClick={() => handlePromptClick(prompt)}
          className="bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-xl border p-3 text-left text-sm transition-colors"
        >
          {prompt}
        </motion.button>
      ))}
    </div>
  );
};
