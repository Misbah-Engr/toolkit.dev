import React from "react";

import { Section } from "../lib/section";

import { WorkbenchCard } from "./card";

import { workbenchExamples } from "./data";
import { Heading } from "../lib/heading";

export const WorkbenchSection: React.FC = () => {
  return (
    <Section id="workbenches">
      <div className="container mx-auto px-2 md:px-4">
        <Heading
          title={["Configure Custom", "Workbenches"]}
          description="Combine multiple toolkits with specialized system prompts to create a tailored AI assistant."
        />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {workbenchExamples.map((workbench) => (
            <WorkbenchCard key={workbench.title} workbench={workbench} />
          ))}
        </div>
      </div>
    </Section>
  );
};
