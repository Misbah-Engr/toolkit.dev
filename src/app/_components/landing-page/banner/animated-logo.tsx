"use client";

import React, { useCallback, useEffect, useRef } from "react";

import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { cn } from "@/lib/utils";

const DURATION = 1180;
const DELAY = 2500;

interface Props {
  className?: string;
}

export const AnimatedLogo: React.FC<Props> = ({ className }) => {
  const [animationData, setAnimationData] = React.useState<object | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    void fetch("/logo/animated.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data as object));
  }, []);

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
      }, DELAY);
    }, DELAY);

    return () => clearInterval(interval);
  }, [animationData, playAnimation]);

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
