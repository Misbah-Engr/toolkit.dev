"use client";

import React from "react";
import { motion } from "motion/react";
import { Marquee } from "@/components/magicui/marquee";
import { Card } from "@/components/ui/card";
import type { Dependency } from "./types";
import { dependencies } from "./data";
import { HStack } from "@/components/ui/stack";

export const DependenciesSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-2 md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Built on the
            <span className="text-primary block">Shoulders of Giants</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Toolkit is powered by the incredible work of the open source
            community.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-x-hidden"
        >
          {/* First row - normal direction */}
          <Marquee className="gap-2 py-1" pauseOnHover>
            {dependencies
              .slice(0, Math.ceil(dependencies.length / 2))
              .map((dependency, index) => (
                <DependencyCard
                  key={`${dependency.name}-${index}`}
                  dependency={dependency}
                />
              ))}
          </Marquee>

          {/* Second row - reverse direction */}
          <Marquee className="gap-2 py-0" pauseOnHover reverse>
            {dependencies
              .slice(Math.ceil(dependencies.length / 2))
              .map((dependency, index) => (
                <DependencyCard
                  key={`${dependency.name}-reverse-${index}`}
                  dependency={dependency}
                />
              ))}
          </Marquee>

          {/* Gradient overlays */}
          <div className="from-background pointer-events-none absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r to-transparent" />
          <div className="from-background pointer-events-none absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

const DependencyCard: React.FC<{ dependency: Dependency }> = ({
  dependency,
}) => (
  <Card className="border-border/50 hover:border-primary/20 group flex-shrink-0 p-2 transition-all duration-300 hover:shadow-lg">
    <HStack className="gap-2">
      {dependency.icon}
      <h3 className="truncate text-lg font-semibold">{dependency.name}</h3>
    </HStack>
  </Card>
);
