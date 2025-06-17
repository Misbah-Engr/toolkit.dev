"use client";

import React from "react";
import { HeroSection } from "./hero";
import { ToolkitCreationSection } from "./toolkit-creation";
import { WorkbenchSection } from "./workbench-section";
import { DependenciesSection } from "./dependencies";
import { Navbar } from "./navbar";

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <DependenciesSection />
      <ToolkitCreationSection />
      <WorkbenchSection />
    </div>
  );
};

export default LandingPage;
