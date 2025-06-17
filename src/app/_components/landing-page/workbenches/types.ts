import type { Toolkits } from "@/toolkits/toolkits/shared";

export interface WorkbenchExample {
  title: string;
  description: string;
  systemPrompt: string;
  toolkits: Toolkits[];
  icon: React.ReactNode;
  color: string;
}
