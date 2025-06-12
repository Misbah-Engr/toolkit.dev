import { cn } from "@/lib/utils";
import type { Provider } from "@/lib/ai/types";
import { modelIcons } from "@/app/(chat)/_components/input/model-select/utils";

interface Props {
  provider: Provider;
  className?: string;
}

export const ModelProviderIcon: React.FC<Props> = ({ provider, className }) => {
  const Icon = modelIcons[provider] ?? null;

  return Icon ? <Icon className={cn("size-4", className)} /> : null;
};
