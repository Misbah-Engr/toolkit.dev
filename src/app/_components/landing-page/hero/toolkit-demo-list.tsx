"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence, useInView } from "motion/react";

import { demoSequence } from "./data";
import { MessageItem } from "./message";

export const ToolkitDemoList: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [isAtBottom, setIsAtBottom] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scrollContainerRef, {
    amount: 0.1,
  });

  // Sensitivity threshold in pixels - user is considered "at bottom" if within this range
  const BOTTOM_THRESHOLD = 100;

  // Check if user is at or near the bottom of the scroll container
  const checkIfAtBottom = useCallback(() => {
    if (!scrollContainerRef.current) return false;

    const container = scrollContainerRef.current;
    const { scrollTop, scrollHeight, clientHeight } = container;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    return distanceFromBottom <= BOTTOM_THRESHOLD;
  }, [BOTTOM_THRESHOLD]);

  // Handle scroll events to track if user is at bottom
  const handleScroll = useCallback(() => {
    setIsAtBottom(checkIfAtBottom());
  }, [checkIfAtBottom]);

  const scrollToBottom = useCallback(
    (behavior: "smooth" | "instant" = "smooth") => {
      if (!scrollContainerRef.current || !isAtBottom) return;
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: behavior,
      });
    },
    [isAtBottom],
  );

  // Autoscroll to bottom when new messages are added, but only if user is already at bottom
  useEffect(() => {
    scrollToBottom();
  }, [currentIndex, completedItems, isAtBottom, scrollToBottom]);

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (!isInView) return;

    if (currentIndex >= demoSequence.length) return;

    const currentItem = demoSequence[currentIndex];
    if (!currentItem) return;

    // For tool messages, wait 2 seconds then mark as completed
    if (currentItem.type === "tool") {
      const timer = setTimeout(() => {
        setCompletedItems((prev) => new Set(prev).add(currentItem.id));

        // Wait another 1 second before showing next item
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
        }, 1500);
      }, 1500);

      return () => clearTimeout(timer);
    } else if (currentItem.type === "user") {
      // For user and assistant messages, wait 1.5 seconds before next item
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, isInView]);

  const onDone = useMemo(
    () => () => {
      setCurrentIndex((prev) => prev + 1);
    },
    [],
  );

  const visibleItems = demoSequence.slice(0, currentIndex + 1);

  return (
    <div
      ref={scrollContainerRef}
      className="no-scrollbar mx-auto h-full w-full overflow-y-auto px-2"
    >
      <div className="flex h-full flex-col justify-start">
        <AnimatePresence>
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                scale: item.type === "assistant" ? 1 : 0.8,
                y: item.type === "assistant" ? 0 : 20,
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "backOut",
                delay: index === currentIndex ? 0 : 0,
              }}
              className="w-full py-2"
            >
              <MessageItem
                item={item}
                isCompleted={completedItems.has(item.id)}
                onDone={onDone}
                scrollToBottom={() => scrollToBottom("instant")}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
