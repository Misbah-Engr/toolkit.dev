"use client";

import React from "react";
import { motion } from "motion/react";
import { WorkbenchCard } from "./card";
import { workbenchExamples } from "./data";

export const WorkbenchSection: React.FC = () => {
  return (
    <section className="from-muted/20 to-background bg-gradient-to-b py-24">
      <div className="container mx-auto px-2 md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Configure Custom
            <span className="text-primary block">Workbenches</span>
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
            Workbenches combine multiple toolkits with specialized system
            prompts to create focused AI assistants for specific use cases. Each
            workbench orchestrates toolkit interactions seamlessly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {workbenchExamples.map((workbench, index) => (
            <WorkbenchCard
              key={workbench.title}
              workbench={workbench}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
