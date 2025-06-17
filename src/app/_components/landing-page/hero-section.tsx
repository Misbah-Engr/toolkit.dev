"use client";

import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ToolkitDemoList } from "./toolkit-demo-list";
import { Card } from "@/components/ui/card";

export const HeroSection: React.FC = () => {
  return (
    <section className="from-background via-background/95 to-muted/20 relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, rgb(var(--foreground) / 0.1) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />
      <div className="via-background/50 to-background absolute inset-0 bg-gradient-to-br from-transparent" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="from-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-4xl leading-tight font-bold text-transparent md:text-6xl">
                Background jobs
                <br />
                <span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
                  & AI infrastructure
                </span>
              </h1>

              <p className="text-muted-foreground max-w-lg text-lg leading-relaxed md:text-xl">
                Write workflows in normal async code and we&apos;ll handle the
                rest, from queues to elastic scaling. No timeouts, retries,
                observability, and zero infrastructure to manage.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="text-base font-semibold">
                  Get started now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    11.4k Open source
                  </span>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Toolkit Demo */}
          <div className="relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="w-full max-w-lg"
            >
              <Card className="">
                <ToolkitDemoList />
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
