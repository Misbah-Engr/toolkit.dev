import type { Toolkits } from "@/toolkits/toolkits/shared";
import type { ClientToolkit } from "@/toolkits/types";

export type SelectedToolkit = {
  id: Toolkits;
  toolkit: ClientToolkit;
  parameters: Record<string, unknown>;
};
