"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "@/components/ui/card";
import { clientToolkits } from "@/toolkits/toolkits/client";
import { Toolkits } from "@/toolkits/toolkits/shared";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { HStack } from "@/components/ui/stack";
import { Check, Loader2 } from "lucide-react";

interface MessageItem {
  id: string;
  type: "user" | "assistant" | "tool";
  content: string;
  toolkit?: Toolkits;
  completedContent?: string; // For tool messages that change from loading to complete
}

const demoSequence: MessageItem[] = [
  {
    id: "1",
    type: "user",
    content:
      "Research the latest AI startup trends and analyze relevant GitHub repositories",
  },
  {
    id: "2",
    type: "tool",
    content: "Searching for AI startup trends...",
    completedContent:
      "Found 15 relevant articles about AI startup funding and trends",
    toolkit: Toolkits.Exa,
  },
  {
    id: "3",
    type: "tool",
    content: "Analyzing GitHub repositories for trending AI projects...",
    completedContent:
      "Analyzed 25 trending AI repositories and their technologies",
    toolkit: Toolkits.Github,
  },
  {
    id: "4",
    type: "assistant",
    content:
      "Based on my research, here are the key AI startup trends: Edge AI, Autonomous agents, and Multimodal AI are leading the market...",
  },
  {
    id: "5",
    type: "user",
    content:
      "Create a visual summary and remember the key insights for future reference",
  },
  {
    id: "6",
    type: "tool",
    content: "Generating trend visualization chart...",
    completedContent:
      "Created comprehensive AI trends infographic with market data",
    toolkit: Toolkits.Image,
  },
  {
    id: "7",
    type: "tool",
    content: "Storing insights about AI trends and key findings...",
    completedContent:
      "Saved key insights: Edge AI adoption up 340%, $12B in funding",
    toolkit: Toolkits.Memory,
  },
];

const UserMessage: React.FC<{ content: string }> = ({ content }) => (
  <div className="flex w-full justify-end">
    <div className="user-message max-w-xs rounded-xl px-3 py-2 text-sm text-white">
      {content}
    </div>
  </div>
);

const AssistantMessage: React.FC<{ content: string }> = ({ content }) => (
  <div className="flex w-full gap-3">
    <div className="flex-1 text-sm">{content}</div>
  </div>
);

const ToolMessage: React.FC<{
  content: string;
  toolkit: Toolkits;
  isCompleted: boolean;
  completedContent?: string;
}> = ({ content, toolkit, isCompleted, completedContent }) => {
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
            {isCompleted && completedContent ? completedContent : content}
          </motion.div>
        </div>
      </Card>
    </div>
  );
};

const MessageItem: React.FC<{
  item: MessageItem;
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
          content={item.content}
          toolkit={item.toolkit!}
          isCompleted={isCompleted}
          completedContent={item.completedContent}
        />
      );
    default:
      return null;
  }
};

export const ToolkitDemoList: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (currentIndex >= demoSequence.length) return;

    const currentItem = demoSequence[currentIndex];
    if (!currentItem) return;

    // For tool messages, wait 2 seconds then mark as completed
    if (currentItem.type === "tool") {
      const timer = setTimeout(() => {
        setCompletedItems((prev) => new Set(prev).add(currentItem.id));

        // Wait another 1 second before showing next item
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
        }, 1000);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      // For user and assistant messages, wait 1.5 seconds before next item
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const visibleItems = demoSequence.slice(0, currentIndex + 1);

  return (
    <div className="mx-auto h-full w-full overflow-y-auto">
      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "backOut",
                delay: index === currentIndex ? 0 : 0,
              }}
              className="w-full"
            >
              <MessageItem
                item={item}
                isCompleted={completedItems.has(item.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
