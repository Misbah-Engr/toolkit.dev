"use client";

import React, { useRef } from "react";
import { motion } from "motion/react";
import { clientToolkits } from "@/toolkits/toolkits/client";
import { Logo } from "@/components/ui/logo";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolkitCardProps {
  toolkit: any;
  delay: number;
  cardRef: React.RefObject<HTMLDivElement>;
}

const ToolkitCard: React.FC<ToolkitCardProps> = ({ toolkit, delay, cardRef }) => {
  const IconComponent = toolkit.icon;
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "backOut" }}
      className="relative rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2 flex items-center justify-center">
          <IconComponent className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-sm text-foreground">{toolkit.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">{toolkit.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  
  // Create refs for each toolkit card
  const toolkitRefs = Object.keys(clientToolkits).map(() => 
    React.createRef<HTMLDivElement>()
  );

  const toolkitEntries = Object.entries(clientToolkits);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-muted/20 overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, rgb(var(--foreground) / 0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/50 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent leading-tight">
                Background jobs
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  & AI infrastructure
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Write workflows in normal async code and we'll handle the
                rest, from queues to elastic scaling. No timeouts, retries,
                observability, and zero infrastructure to manage.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-base font-semibold">
                  Get started now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="text-base font-semibold">
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    11.4k Open source
                  </span>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Toolkit Visualization */}
          <div className="relative" ref={containerRef}>
            <div className="relative w-full h-[600px] flex items-center justify-center">
              {/* Central Logo */}
              <motion.div
                ref={logoRef}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "backOut" }}
                className="absolute z-20 rounded-2xl bg-background border-2 border-primary/20 p-6 shadow-2xl"
              >
                <Logo className="h-12 w-12" />
              </motion.div>

              {/* Toolkit Cards arranged in a circle */}
              {toolkitEntries.map(([id, toolkit], index) => {
                const angle = (index / toolkitEntries.length) * 2 * Math.PI;
                const radius = 220;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <div
                    key={id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                    }}
                  >
                    <ToolkitCard
                      toolkit={toolkit}
                      delay={0.5 + index * 0.1}
                      cardRef={toolkitRefs[index]}
                    />
                  </div>
                );
              })}

              {/* Animated Beams */}
              {toolkitRefs.map((ref, index) => (
                <AnimatedBeam
                  key={index}
                  containerRef={containerRef}
                  fromRef={ref}
                  toRef={logoRef}
                  curvature={-50}
                  duration={3 + Math.random() * 2}
                  delay={1 + index * 0.2}
                  pathOpacity={0.3}
                  gradientStartColor="#3b82f6"
                  gradientStopColor="#8b5cf6"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};