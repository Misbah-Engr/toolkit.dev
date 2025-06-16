"use client";

import { motion, AnimatePresence } from "motion/react";
import { MultimodalInput } from "./input";
import { Messages } from "./messages";
import { StarterPrompts } from "./starter-prompts";

import { useScrollToBottom } from "../_hooks/use-scroll-to-bottom";
import { useChatContext } from "../_contexts/chat-context";

import { ChatProvider } from "../_contexts/chat-context";

import type { UIMessage } from "ai";
import type { Session } from "next-auth";
import type { Workbench } from "@prisma/client";

interface Props {
  id: string;
  initialMessages: Array<UIMessage>;
  initialChatModel: string;
  initialVisibilityType: "public" | "private";
  isReadonly: boolean;
  session: Session;
  autoResume: boolean;
  hasInitialMessages: boolean;
  workbench?: Workbench;
}

const ChatContent = ({
  id,
  isReadonly,
  hasInitialMessages,
}: {
  id: string;
  isReadonly: boolean;
  hasInitialMessages: boolean;
}) => {
  const {
    containerRef,
    endRef,
    isAtBottom,
    scrollToBottom,
    onViewportEnter,
    onViewportLeave,
  } = useScrollToBottom();

  const { messages } = useChatContext();
  const hasMessages = messages.length > 0;

  return (
    <div className="bg-background relative flex h-full min-w-0 flex-col">
      {/* Messages - always shown */}
      <Messages
        chatId={id}
        isReadonly={isReadonly}
        containerRef={containerRef}
        endRef={endRef}
        onViewportEnter={onViewportEnter}
        onViewportLeave={onViewportLeave}
        scrollToBottom={scrollToBottom}
      />

      {/* Input Container - absolutely positioned, contains greeting, input, and starter prompts */}
      <motion.div
        initial={
          hasInitialMessages ? { y: 0 } : { y: "calc(-50vh + 50% - 1rem)" }
        }
        animate={
          hasMessages || hasInitialMessages
            ? { y: 0 }
            : { y: "calc(-50vh + 50% - 1rem)" }
        }
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.4,
        }}
        className="absolute bottom-4 left-1/2 h-fit w-full max-w-3xl -translate-x-1/2 px-4"
      >
        {/* Greeting - only shown when no messages */}
        <AnimatePresence>
          {!hasMessages && !hasInitialMessages && (
            <motion.div
              initial={{ opacity: 0, y: 10, marginBottom: "2rem" }}
              animate={{
                opacity: 1,
                y: 0,
                marginBottom: "2rem",
              }}
              exit={{ opacity: 0, marginBottom: 0 }}
              transition={{
                enter: { delay: 0.1, duration: 0.3 },
                exit: { delay: 0, duration: 0.05 },
              }}
              className="overflow-hidden text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-3xl font-semibold md:text-4xl"
              >
                Hello there!
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mt-2 text-xl text-zinc-500 md:text-2xl"
              >
                How can I help you today?
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input */}
        {!isReadonly && (
          <MultimodalInput
            chatId={id}
            isAtBottom={isAtBottom}
            scrollToBottom={scrollToBottom}
          />
        )}

        {/* Starter Prompts - only shown when no messages */}
        <AnimatePresence>
          {!hasMessages && !hasInitialMessages && (
            <motion.div
              initial={{ opacity: 0, y: 10, marginTop: "1rem", height: "auto" }}
              animate={{
                opacity: 1,
                y: 0,
                height: "auto",
                marginTop: "1rem",
              }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{
                enter: { delay: 0.4, duration: 0.3 },
                exit: { delay: 0, duration: 0.1 },
              }}
              className="overflow-hidden"
            >
              {!hasMessages && <StarterPrompts />}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export const Chat = ({
  id,
  initialMessages,
  initialVisibilityType,
  isReadonly,
  autoResume,
  workbench,
}: Props) => {
  return (
    <ChatProvider
      id={id}
      initialMessages={initialMessages}
      initialVisibilityType={initialVisibilityType}
      autoResume={autoResume}
      workbench={workbench}
    >
      <ChatContent
        id={id}
        isReadonly={isReadonly}
        hasInitialMessages={initialMessages.length > 0}
      />
    </ChatProvider>
  );
};
