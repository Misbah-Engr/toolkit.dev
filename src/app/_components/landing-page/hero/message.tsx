import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/stack";
import { clientToolkits } from "@/toolkits/toolkits/client";
import type { Toolkits } from "@/toolkits/toolkits/shared";
import { Check, Loader2 } from "lucide-react";
import { motion } from "motion/react";

import type { Message } from "./types";

export const MessageItem: React.FC<{
  item: Message;
  isCompleted: boolean;
}> = ({ item, isCompleted }) => {
  switch (item.type) {
    case "user":
      return <UserMessage content={item.content} />;
    case "assistant":
      return <AssistantMessage content={item.content} />;
    case "tool":
      return (
        <ToolMessage
          callComponent={item.callComponent}
          resultComponent={item.resultComponent}
          toolkit={item.toolkit}
          isCompleted={isCompleted}
        />
      );
    default:
      return null;
  }
};

export const UserMessage: React.FC<{ content: string }> = ({ content }) => (
  <div className="flex w-full justify-end">
    <div className="user-message max-w-xs rounded-xl px-3 py-2 text-sm text-white">
      {content}
    </div>
  </div>
);

export const AssistantMessage: React.FC<{ content: string }> = ({
  content,
}) => (
  <div className="flex w-full gap-3">
    <div className="flex-1 text-sm">{content}</div>
  </div>
);

export const ToolMessage: React.FC<{
  callComponent: React.ReactNode;
  resultComponent: React.ReactNode;
  toolkit: Toolkits;
  isCompleted: boolean;
}> = ({ callComponent, resultComponent, toolkit, isCompleted }) => {
  const clientToolkit = clientToolkits[toolkit];
  const IconComponent = clientToolkit.icon;

  return (
    <div className="flex w-full gap-3">
      <Card className="flex-1 gap-0 overflow-hidden p-0">
        <HStack className="bg-muted/50 border-b p-2">
          <IconComponent className="size-4" />
          {!isCompleted ? (
            <AnimatedShinyText className="text-sm font-medium">
              {clientToolkit.name} Toolkit
            </AnimatedShinyText>
          ) : (
            <span className="text-sm font-medium">
              {clientToolkit.name} Toolkit
            </span>
          )}
          {!isCompleted ? (
            <Loader2 className="size-4 animate-spin opacity-60" />
          ) : (
            <Check className="size-4" />
          )}
        </HStack>
        <div className="p-2">
          <motion.div
            key={isCompleted ? "completed" : "loading"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-sm"
          >
            {isCompleted ? resultComponent : callComponent}
          </motion.div>
        </div>
      </Card>
    </div>
  );
};
