"use client";

import React, { useRef } from "react";

import { Plus } from "lucide-react";
import { SiAnthropic, SiOpenai, SiX } from "@icons-pack/react-simple-icons";

import { Logo } from "@/components/ui/logo";
import { HStack, VStack } from "@/components/ui/stack";

import { AnimatedBeam, Circle } from "@/components/magicui/animated-beam";

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
