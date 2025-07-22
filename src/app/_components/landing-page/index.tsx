import React from "react";

import { HeroSection } from "./hero";
import { FeaturesSection } from "./features";
import { MeritSection } from "./merit";
import { TopToolkitsSection } from "./top-toolkits";
import { ToolkitCreationSection } from "./toolkit-creation";
import { WorkbenchSection } from "./workbenches";
import { WorkbenchExamplesSection } from "./workbench-examples";
import { DependenciesSection } from "./dependencies";
import { Navbar } from "./navbar";

export const LandingPage: React.FC = () => {
  return (
    <div className="h-fit min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-full divide-y pt-16 md:max-w-5xl md:border-x">
        <HeroSection />
        <FeaturesSection />
        <MeritSection />
        <TopToolkitsSection />
        <ToolkitCreationSection />
        <DependenciesSection />
        <WorkbenchSection />
        <WorkbenchExamplesSection />
      </div>
    </div>
  );
};

export default LandingPage;
