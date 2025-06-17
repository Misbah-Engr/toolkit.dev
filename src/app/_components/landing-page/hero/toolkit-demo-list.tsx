"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

import { demoSequence } from "./data";
import { MessageItem } from "./message";

export const ToolkitDemoList: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [isAtBottom, setIsAtBottom] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sensitivity threshold in pixels - user is considered "at bottom" if within this range
  const BOTTOM_THRESHOLD = 50;

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

  // Autoscroll to bottom when new messages are added, but only if user is already at bottom
  useEffect(() => {
    if (isAtBottom && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [currentIndex, isAtBottom]);

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
        }, 1000);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      // For user and assistant messages, wait 1.5 seconds before next item
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const visibleItems = demoSequence.slice(0, currentIndex + 1);

  return (
    <div
      ref={scrollContainerRef}
      className="no-scrollbar mx-auto h-full w-full overflow-y-auto px-2"
    >
      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "backOut",
                delay: index === currentIndex ? 0 : 0,
              }}
              className="w-full"
            >
              <MessageItem
                item={item}
                isCompleted={completedItems.has(item.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
