import { Brain, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

import { SearchOptions } from "@/ai/types";
import { SiOpenai } from "@icons-pack/react-simple-icons";

interface Props {
  searchOption: SearchOptions;
  className?: string;
}

export const SearchTypeIcon: React.FC<Props> = ({
  searchOption,
  className,
}) => {
  const Icon = {
    [SearchOptions.Native]: Brain,
    [SearchOptions.OpenAiResponses]: SiOpenai,
    [SearchOptions.Exa]: Sparkles,
  }[searchOption];

  return Icon ? <Icon className={cn("size-4", className)} /> : null;
};
