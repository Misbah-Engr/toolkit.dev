import React from "react";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const MeritLogo: React.FC<Props> = ({ className }) => {
  return (
    <>
      <Image
        src="/merit/light.svg"
        alt="Merit"
        width={100}
        height={100}
        className={cn(className, "dark:hidden")}
      />
      <Image
        src="/merit/dark.svg"
        alt="Merit"
        width={100}
        height={100}
        className={cn(className, "hidden dark:block")}
      />
    </>
  );
};
