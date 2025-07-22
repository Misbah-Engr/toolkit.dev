import React from "react";

import { Navbar } from "./navbar";
import { Banner } from "./banner";

import { HeroSection } from "./hero";
import { FeaturesSection } from "./features";
import { MeritSection } from "./merit";
import { TopToolkitsSection } from "./top-toolkits";
import { ToolkitCreationSection } from "./toolkit-creation";
import { WorkbenchSection } from "./workbenches";
import { WorkbenchExamplesSection } from "./workbench-examples";
import { DependenciesSection } from "./dependencies";
import { ContributorsSection } from "./contributors";
import { GraphHeroSection } from "./hero/sandbox";

export const LandingPage: React.FC = () => {
  return (
    <div className="relative">
      <Navbar />
      <Banner />
      <div className="mx-auto max-w-full divide-y md:max-w-5xl md:border-x">
        <HeroSection />
        <GraphHeroSection />
        <FeaturesSection />
        <MeritSection />
        <ContributorsSection />
        <TopToolkitsSection />
        <ToolkitCreationSection />
        <WorkbenchSection />
        <WorkbenchExamplesSection />
        <DependenciesSection />
      </div>
    </div>
  );
};

export default LandingPage;
