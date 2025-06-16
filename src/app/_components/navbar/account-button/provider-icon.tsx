import {
  SiDiscord,
  SiGithub,
  SiGoogle,
  SiNotion,
  SiX,
} from "@icons-pack/react-simple-icons";

import { cn } from "@/lib/utils";

interface Props {
  provider: string;
  className?: string;
}

export const AuthProviderIcon: React.FC<Props> = ({ provider, className }) => {
  const Icon =
    {
      Discord: SiDiscord,
      Google: SiGoogle,
      GitHub: SiGithub,
      Twitter: SiX,
      Notion: SiNotion,
    }[provider] ?? null;

  return Icon ? <Icon className={cn("size-4", className)} /> : null;
};
