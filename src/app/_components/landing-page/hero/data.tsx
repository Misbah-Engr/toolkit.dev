import {
  RecentAINewsCalling,
  RecentAINewsResult,
} from "./message/recent-ai-news";
import { RepositoryCalling, RepositoryResult } from "./message/repository";
import type { Message } from "./types";
import { Toolkits } from "@/toolkits/toolkits/shared";

export const demoSequence: Message[] = [
  {
    id: "1",
    type: "user",
    content:
      "Research the latest AI startup trends and analyze relevant GitHub repositories",
  },
  {
    id: "2",
    type: "tool",
    callComponent: <RecentAINewsCalling />,
    resultComponent: <RecentAINewsResult />,
    toolkit: Toolkits.Exa,
  },
  {
    id: "3",
    type: "tool",
    callComponent: <RepositoryCalling />,
    resultComponent: <RepositoryResult />,
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
    callComponent: <RecentAINewsCalling />,
    resultComponent: <RecentAINewsResult />,
    toolkit: Toolkits.Image,
  },
  {
    id: "7",
    type: "tool",
    callComponent: <RecentAINewsCalling />,
    resultComponent: <RecentAINewsResult />,
    toolkit: Toolkits.Memory,
  },
];
