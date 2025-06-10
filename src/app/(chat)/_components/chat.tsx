"use client";

import { MultimodalInput } from "./input";
import { Messages } from "./messages";

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

export const Chat: React.FC<Props> = ({
  id,
  initialMessages,
  initialVisibilityType,
  isReadonly,
  autoResume,
}) => {
  return (
    <ChatProvider
      id={id}
      initialMessages={initialMessages}
      initialVisibilityType={initialVisibilityType}
      autoResume={autoResume}
    >
      <div className="bg-background flex h-full min-w-0 flex-col">
        <Messages chatId={id} isReadonly={isReadonly} />

        <form className="bg-background mx-auto flex w-full gap-2 px-4 pb-4 md:max-w-3xl md:pb-6">
          {!isReadonly && <MultimodalInput chatId={id} />}
        </form>
      </div>
    </ChatProvider>
  );
};
