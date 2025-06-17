"use client";

import React from "react";
import { HeroSection } from "./hero-section";
import { ToolkitCreationSection } from "./toolkit-creation";
import { WorkbenchSection } from "./workbench-section";
import { DependenciesSection } from "./dependencies";

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <DependenciesSection />
      <ToolkitCreationSection />
      <WorkbenchSection />
    </div>
  );
};

export default LandingPage;
