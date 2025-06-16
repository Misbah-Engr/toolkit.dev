"use client";

import React from "react";
import { HeroSection } from "./hero-section";
import { ToolkitCreationSection } from "./toolkit-creation-section";
import { ToolkitSynergySection } from "./toolkit-synergy-section";

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ToolkitCreationSection />
      <ToolkitSynergySection />
    </div>
  );
};

export default LandingPage;