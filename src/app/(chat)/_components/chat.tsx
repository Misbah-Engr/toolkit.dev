"use client";

import { motion, AnimatePresence } from "motion/react";
import { MultimodalInput } from "./input";
import { Messages } from "./messages";
import { WelcomeState } from "./welcome-state";

import { useScrollToBottom } from "../_hooks/use-scroll-to-bottom";
import { useChatContext } from "../_contexts/chat-context";

import { ChatProvider } from "../_contexts/chat-context";

import type { UIMessage } from "ai";
import type { Session } from "next-auth";

interface Props {
  id: string;
  initialMessages: Array<UIMessage>;
  initialChatModel: string;
  initialVisibilityType: "public" | "private";
  isReadonly: boolean;
  session: Session;
  autoResume: boolean;
}

const ChatContent = ({ id, isReadonly }: { id: string; isReadonly: boolean }) => {
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
    <div className="bg-background flex h-full min-w-0 flex-col">
      <AnimatePresence mode="wait">
        {!hasMessages ? (
          <WelcomeState 
            chatId={id}
            isAtBottom={isAtBottom}
            scrollToBottom={scrollToBottom}
          />
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-full min-w-0 flex-col"
          >
            <Messages
              chatId={id}
              isReadonly={isReadonly}
              containerRef={containerRef}
              endRef={endRef}
              onViewportEnter={onViewportEnter}
              onViewportLeave={onViewportLeave}
              scrollToBottom={scrollToBottom}
            />

            <motion.form 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                delay: 0.1 
              }}
              className="mx-auto flex w-full gap-2 px-4 pb-4 md:max-w-3xl md:pb-6"
            >
              {!isReadonly && (
                <MultimodalInput
                  chatId={id}
                  isAtBottom={isAtBottom}
                  scrollToBottom={scrollToBottom}
                />
              )}
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Chat = ({
  id,
  initialMessages,
  initialVisibilityType,
  isReadonly,
  autoResume,
}: Props) => {
  return (
    <ChatProvider
      id={id}
      initialMessages={initialMessages}
      initialVisibilityType={initialVisibilityType}
      autoResume={autoResume}
    >
      <ChatContent id={id} isReadonly={isReadonly} />
    </ChatProvider>
  );
};
