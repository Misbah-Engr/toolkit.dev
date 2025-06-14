import { memo } from "react";

import { SiGithub } from "@icons-pack/react-simple-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";

interface Props {
  login: string;
  className?: string;
  style?: React.CSSProperties;
}

export const GithubAvatar = memo(function GithubAvatar({
  login,
  className,
  style,
}: Props) {
  return (
    <Avatar className={cn("size-10 rounded-full", className)} style={style}>
      <AvatarImage
        src={`https://github.com/${login}.png`}
        alt={login}
        className="object-cover"
      />
      <AvatarFallback className="bg-muted dark:bg-muted p-1">
        <SiGithub className="size-full opacity-60" />
      </AvatarFallback>
    </Avatar>
  );
});
