import { memo } from "react";
import { motion } from "motion/react";
import equal from "fast-deep-equal";
import { PreviewMessage, ThinkingMessage } from "./message";
import { Greeting } from "./greeting";
import { useMessages } from "../../_hooks/use-messages";
import { useChatContext } from "../../_contexts/chat-context";

interface Props {
  chatId: string;
  isReadonly: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  endRef: React.RefObject<HTMLDivElement | null>;
  onViewportEnter: () => void;
  onViewportLeave: () => void;
}

const PureMessages: React.FC<Props> = ({
  chatId,
  isReadonly,
  containerRef,
  endRef,
  onViewportEnter,
  onViewportLeave,
}) => {
  const { messages, status } = useChatContext();

  const { hasSentMessage } = useMessages({
    chatId,
    status,
  });

  return (
    <div
      ref={containerRef}
      className="relative flex min-w-0 flex-1 flex-col gap-6 overflow-y-scroll pt-4"
    >
      {messages.length === 0 && <Greeting />}

      {messages.map((message, index) => (
        <PreviewMessage
          key={message.id}
          message={message}
          isLoading={status === "streaming" && messages.length - 1 === index}
          isReadonly={isReadonly}
          requiresScrollPadding={
            hasSentMessage && index === messages.length - 1
          }
        />
      ))}

      {status === "submitted" &&
        messages.length > 0 &&
        messages[messages.length - 1]?.role === "user" && <ThinkingMessage />}

      <motion.div
        ref={endRef}
        className="min-h-[24px] min-w-[24px] shrink-0"
        onViewportLeave={onViewportLeave}
        onViewportEnter={onViewportEnter}
      />
    </div>
  );
};

export const Messages = memo(PureMessages, (prevProps, nextProps) => {
  return equal(prevProps, nextProps);
});
