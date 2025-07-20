"use client";

import React, { useRef } from "react";

import { CircleDollarSign, GitPullRequest } from "lucide-react";

import { MeritLogo } from "@/components/ui/merit-logo";
import { HStack } from "@/components/ui/stack";

import { AnimatedBeam, Circle } from "@/components/magicui/animated-beam";

const animatedBeamProps = {
  pathColor: "var(--color-primary-500)",
  pathWidth: 2,
  pathOpacity: 0.2,
  gradientStartColor: "var(--color-primary-500)",
  gradientStopColor: "var(--color-primary-600)",
  startXOffset: 0,
  startYOffset: 0,
  duration: 4,
};

export const GetPaid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prLogo = useRef<HTMLDivElement>(null);
  const meritRef = useRef<HTMLDivElement>(null);
  const moneyRef = useRef<HTMLDivElement>(null);

  return (
    <HStack ref={containerRef} className="relative w-full justify-between">
      <Circle ref={prLogo}>
        <GitPullRequest className="size-8" />
      </Circle>
      <Circle ref={meritRef} className="p-3">
        <MeritLogo className="size-14" />
      </Circle>
      <Circle ref={moneyRef}>
        <CircleDollarSign className="size-8" />
      </Circle>
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={prLogo}
        toRef={meritRef}
        {...animatedBeamProps}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={meritRef}
        toRef={moneyRef}
        {...animatedBeamProps}
      />
    </HStack>
  );
};
