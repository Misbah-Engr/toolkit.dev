import {
  SiGoogle,
  SiOpenai,
  SiX,
  SiAnthropic,
} from "@icons-pack/react-simple-icons";

import { cn } from "@/lib/utils";

interface Props {
  provider: string;
  className?: string;
}

export const ModelProviderIcon: React.FC<Props> = ({ provider, className }) => {
  const Icon =
    {
      openai: SiOpenai,
      anthropic: SiAnthropic,
      google: SiGoogle,
      xai: SiX,
    }[provider] ?? null;

  return Icon ? <Icon className={cn("size-4", className)} /> : null;
};
