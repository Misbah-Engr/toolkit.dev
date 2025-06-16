"use client";

import React from "react";
import { HeroSection } from "./hero-section";
import { ToolkitCreationSection } from "./toolkit-creation-section";
import { WorkbenchSection } from "./workbench-section";

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ToolkitCreationSection />
      <WorkbenchSection />
    </div>
  );
};

export default LandingPage;