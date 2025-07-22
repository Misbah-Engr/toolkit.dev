import React from "react";

import { Section } from "../lib/section";
import { Heading } from "../lib/heading";

import { WorkbenchForm } from "./workbench-form";

export const WorkbenchSection: React.FC = () => {
  return (
    <Section id="workbenches">
      <Heading
        title={["Configure Custom", "Workbenches"]}
        description="Combine multiple toolkits with specialized system prompts to create a tailored AI assistant."
        className="mb-4"
      />
      <WorkbenchForm />
    </Section>
  );
};
