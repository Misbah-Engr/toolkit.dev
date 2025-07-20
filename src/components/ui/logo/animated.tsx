"use client";

import React, { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import type { LottieRefCurrentProps } from "lottie-react";
import Lottie from "lottie-react";

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
      />
      <AnimatedLogoWithTheme
        className={cn(className, "hidden dark:block")}
        delay={delay}
        theme="dark"
      />
    </>
  );
};

interface AnimatedLogoPropsWithTheme extends Props {
  theme: "light" | "dark";
}

const AnimatedLogoWithTheme: React.FC<AnimatedLogoPropsWithTheme> = ({
  className,
  delay = DELAY,
  theme,
}) => {
  const [animationData, setAnimationData] = React.useState<object | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    void fetch(`/logo/animated/${theme}.json`)
      .then((res) => res.json())
      .then((data) => setAnimationData(data as object));
  }, [theme]);

  const playAnimation = useCallback(() => {
    lottieRef.current?.play();
    setTimeout(() => {
      lottieRef.current?.stop();
    }, DURATION);
  }, []);

  useEffect(() => {
    if (!animationData) return;

    let interval: NodeJS.Timeout;

    setTimeout(() => {
      playAnimation();

      interval = setInterval(() => {
        playAnimation();
      }, delay);
    }, delay);

    return () => clearInterval(interval);
  }, [animationData, playAnimation, delay]);

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
