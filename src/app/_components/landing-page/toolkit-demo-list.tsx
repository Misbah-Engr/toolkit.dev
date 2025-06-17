"use client";

import React from "react";
import { AnimatedList } from "@/components/magicui/animated-list";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { clientToolkits } from "@/toolkits/toolkits/client";
import { Toolkits } from "@/toolkits/toolkits/shared";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { HStack } from "@/components/ui/stack";
import { CheckCircle, Loader2 } from "lucide-react";

interface MessageItem {
  id: string;
  type: "user" | "assistant" | "tool";
  content: string;
  toolkit?: Toolkits;
  status?: "loading" | "complete";
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
    toolkit: Toolkits.Exa,
    status: "loading",
  },
  {
    id: "3",
    type: "tool",
    content: "Found 15 relevant articles about AI startup funding and trends",
    toolkit: Toolkits.Exa,
    status: "complete",
  },
  {
    id: "4",
    type: "tool",
    content: "Analyzing GitHub repositories for trending AI projects...",
    toolkit: Toolkits.Github,
    status: "loading",
  },
  {
    id: "5",
    type: "tool",
    content: "Analyzed 25 trending AI repositories and their technologies",
    toolkit: Toolkits.Github,
    status: "complete",
  },
  {
    id: "6",
    type: "assistant",
    content:
      "Based on my research, here are the key AI startup trends: Edge AI, Autonomous agents, and Multimodal AI are leading the market...",
  },
  {
    id: "7",
    type: "user",
    content:
      "Create a visual summary and remember the key insights for future reference",
  },
  {
    id: "8",
    type: "tool",
    content: "Generating trend visualization chart...",
    toolkit: Toolkits.Image,
    status: "loading",
  },
  {
    id: "9",
    type: "tool",
    content: "Created comprehensive AI trends infographic with market data",
    toolkit: Toolkits.Image,
    status: "complete",
  },
  {
    id: "10",
    type: "tool",
    content: "Storing insights about AI trends and key findings...",
    toolkit: Toolkits.Memory,
    status: "loading",
  },
  {
    id: "11",
    type: "tool",
    content: "Saved key insights: Edge AI adoption up 340%, $12B in funding",
    toolkit: Toolkits.Memory,
    status: "complete",
  },
];

const UserMessage: React.FC<{ content: string }> = ({ content }) => (
  <div className="flex w-full justify-end">
    <div className="bg-primary text-primary-foreground max-w-xs rounded-xl px-3 py-2 text-sm">
      {content}
    </div>
  </div>
);

const AssistantMessage: React.FC<{ content: string }> = ({ content }) => (
  <div className="flex w-full gap-3">
    <div className="ring-border bg-background flex size-8 shrink-0 items-center justify-center rounded-full ring-1">
      <Logo className="size-4" />
    </div>
    <div className="bg-card flex-1 rounded-xl border px-3 py-2 text-sm">
      {content}
    </div>
  </div>
);

const ToolMessage: React.FC<{
  content: string;
  toolkit: Toolkits;
  status: "loading" | "complete";
}> = ({ content, toolkit, status }) => {
  const clientToolkit = clientToolkits[toolkit];
  const IconComponent = clientToolkit.icon;

  return (
    <div className="flex w-full gap-3">
      <div className="ring-border bg-background flex size-8 shrink-0 items-center justify-center rounded-full ring-1">
        <Logo className="size-4" />
      </div>
      <Card className="flex-1 overflow-hidden p-0">
        <HStack className="bg-muted/50 border-b p-2">
          <IconComponent className="size-4" />
          {status === "loading" ? (
            <AnimatedShinyText className="text-sm font-medium">
              {clientToolkit.name} Toolkit
            </AnimatedShinyText>
          ) : (
            <span className="text-sm font-medium">
              {clientToolkit.name} Toolkit
            </span>
          )}
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin opacity-60" />
          ) : (
            <CheckCircle className="size-4 text-green-500" />
          )}
        </HStack>
        <div className="p-2">
          <div className="text-sm">{content}</div>
        </div>
      </Card>
    </div>
  );
};

const MessageItem: React.FC<{ item: MessageItem }> = ({ item }) => {
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
          status={item.status!}
        />
      );
    default:
      return null;
  }
};

export const ToolkitDemoList: React.FC = () => {
  return (
    <div className="mx-auto max-h-96 w-full max-w-md overflow-y-auto">
      <AnimatedList delay={2000} className="gap-3">
        {demoSequence.map((item) => (
          <div key={item.id} className="w-full">
            <MessageItem item={item} />
          </div>
        ))}
      </AnimatedList>
    </div>
  );
};
