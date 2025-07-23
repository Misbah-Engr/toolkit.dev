"use client";

import React, { useCallback, useEffect, useRef } from "react";

import Lottie from "lottie-react";

import { cn } from "@/lib/utils";

import lightAnimationData from "./light.json";
import darkAnimationData from "./dark.json";

import type { LottieRefCurrentProps } from "lottie-react";

const DURATION = 1180;
const DELAY = 2500;

interface Props {
  className?: string;
  delay?: number;
}

export const AnimatedLogo: React.FC<Props> = ({ className, delay = DELAY }) => {
  return (
    <>
      <AnimatedLogoWithTheme
        className={cn(className, "dark:hidden")}
        delay={delay}
        theme="light"
        animationData={lightAnimationData}
      />
      <AnimatedLogoWithTheme
        className={cn(className, "hidden dark:block")}
        delay={delay}
        theme="dark"
        animationData={darkAnimationData}
      />
    </>
  );
};

interface AnimatedLogoPropsWithTheme extends Props {
  animationData: object;
  theme: "light" | "dark";
}

const AnimatedLogoWithTheme: React.FC<AnimatedLogoPropsWithTheme> = ({
  animationData,
  className,
  delay = DELAY,
}) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const playAnimation = useCallback(() => {
    lottieRef.current?.play();
    setTimeout(() => {
      lottieRef.current?.stop();
    }, DURATION);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    setTimeout(() => {
      playAnimation();

      interval = setInterval(() => {
        playAnimation();
      }, delay);
    }, delay);

    return () => clearInterval(interval);
  }, [playAnimation, delay]);

  return (
    <Lottie
      animationData={animationData}
      lottieRef={lottieRef}
      autoPlay={false}
      loop={false}
      className={className}
    />
  );
};
