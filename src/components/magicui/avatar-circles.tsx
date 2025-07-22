import React from "react";

import { SiGithub } from "@icons-pack/react-simple-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: string[];
  size?: number;
  avatarClassName?: string;
  fallback?: React.ReactNode;
}

export const AvatarCircles: React.FC<AvatarCirclesProps> = ({
  numPeople = 0,
  className,
  avatarUrls,
  size = 40,
  avatarClassName,
  fallback = <SiGithub className="size-full opacity-60" />,
}) => {
  return (
    <div
      className={cn(
        "z-10 flex w-fit -space-x-2 rtl:space-x-reverse",
        className,
      )}
    >
      {avatarUrls.map((url, index) => (
        <Avatar
          key={`${url}-${index}`}
          className={cn("bg-card rounded-full border-none", avatarClassName)}
          style={{
            width: size,
            height: size,
            zIndex: index,
          }}
        >
          <AvatarImage src={url} alt={`Avatar ${index + 1}`} />
          <AvatarFallback className="bg-muted dark:bg-muted p-2">
            {fallback}
          </AvatarFallback>
        </Avatar>
      ))}
      {numPeople > 0 && (
        <p
          className="bg-card flex shrink-0 items-center justify-center rounded-full border text-center text-xs font-medium text-black dark:bg-neutral-700 dark:text-white"
          style={{
            width: size,
            height: size,
            zIndex: avatarUrls.length,
          }}
        >
          +{numPeople}
        </p>
      )}
    </div>
  );
};

interface AvatarCirclesSkeletonProps {
  numAvatars: number;
  className?: string;
  size?: number;
  numPeople?: number;
}

export const AvatarCirclesSkeleton: React.FC<AvatarCirclesSkeletonProps> = ({
  numAvatars,
  className,
  size = 40,
  numPeople = 0,
}) => {
  return (
    <div
      className={cn(
        "z-10 flex w-fit -space-x-2 rtl:space-x-reverse",
        className,
      )}
    >
      {Array.from({ length: numAvatars }).map((_, index) => (
        <Skeleton
          key={index}
          className="rounded-full border-none"
          style={{
            width: size,
            height: size,
            zIndex: index,
          }}
        />
      ))}
      {numPeople > 0 && (
        <p
          className="flex shrink-0 items-center justify-center rounded-full bg-neutral-100 text-center text-xs font-medium text-black dark:bg-neutral-700 dark:text-white"
          style={{
            width: size,
            height: size,
            zIndex: numAvatars,
          }}
        >
          +{numPeople}
        </p>
      )}
    </div>
  );
};
