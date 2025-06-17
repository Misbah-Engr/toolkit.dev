import type { Toolkits } from "@/toolkits/toolkits/shared";

export type Message = {
  id: string;
} & (
  | {
      type: "user";
      content: string;
    }
  | {
      type: "assistant";
      content: string;
    }
  | {
      type: "tool";
      callComponent: React.ReactNode;
      resultComponent: React.ReactNode;
      toolkit: Toolkits;
    }
);
