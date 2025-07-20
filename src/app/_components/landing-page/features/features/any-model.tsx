"use client";

import React, { forwardRef, useRef } from "react";

import { Plus } from "lucide-react";
import { SiAnthropic, SiOpenai, SiX } from "@icons-pack/react-simple-icons";

import { Logo } from "@/components/ui/logo";
import { HStack, VStack } from "@/components/ui/stack";

import { AnimatedBeam } from "@/components/magicui/animated-beam";

import { cn } from "@/lib/utils";

const iconProps = {
  className: "size-4",
};

const animatedBeamProps = {
  pathColor: "var(--color-primary-500)",
  pathWidth: 2,
  pathOpacity: 0.2,
  gradientStartColor: "var(--color-primary-500)",
  gradientStopColor: "var(--color-primary-600)",
  startXOffset: 0,
  startYOffset: 0,
  duration: 6,
};

export const AnyModel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);
  const target1Ref = useRef<HTMLDivElement>(null);
  const target2Ref = useRef<HTMLDivElement>(null);
  const target3Ref = useRef<HTMLDivElement>(null);
  const target4Ref = useRef<HTMLDivElement>(null);

  return (
    <VStack ref={containerRef} className="relative w-full gap-8">
      <Circle ref={sourceRef} className="p-4">
        <Logo className="size-8" />
      </Circle>
      <HStack className="w-full justify-between">
        <Circle ref={target1Ref}>
          <SiOpenai {...iconProps} />
        </Circle>
        <Circle ref={target2Ref}>
          <SiAnthropic {...iconProps} />
        </Circle>
        <Circle ref={target3Ref}>
          <SiX {...iconProps} />
        </Circle>
        <Circle ref={target4Ref}>
          <Plus {...iconProps} />
        </Circle>
      </HStack>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={sourceRef}
        toRef={target1Ref}
        reverse
        {...animatedBeamProps}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={sourceRef}
        toRef={target2Ref}
        reverse
        {...animatedBeamProps}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={sourceRef}
        toRef={target3Ref}
        {...animatedBeamProps}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={sourceRef}
        toRef={target4Ref}
        {...animatedBeamProps}
      />
    </VStack>
  );
};

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "border-border z-10 flex items-center justify-center rounded-full border-2 bg-white p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";
