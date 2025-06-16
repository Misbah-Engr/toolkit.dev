import type { ClientToolkit } from "@/toolkits/types";

export type SelectedToolkit = {
  id: string;
  toolkit: ClientToolkit;
  parameters: Record<string, unknown>;
};
