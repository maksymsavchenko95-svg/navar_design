import React from "react";
import { LandingHeader } from "./landing/LandingHeader";
import { HeroSection } from "./landing/HeroSection";
import { StatsBand } from "./landing/StatsBand";
import { ProblemSection } from "./landing/ProblemSection";
import { ExistingToolsSection } from "./landing/ExistingToolsSection";
import { HowItWorksSection } from "./landing/HowItWorksSection";
import { DifferentiationSection } from "./landing/DifferentiationSection";
import { TrustEngineeringSection } from "./landing/TrustEngineeringSection";
import { SafetySection } from "./landing/SafetySection";
import { FaqSection } from "./landing/FaqSection";
import { FinalCtaSection } from "./landing/FinalCtaSection";
import { LandingFooter } from "./landing/LandingFooter";

interface LandingPageProps {
  onLogin: () => void;
}

export function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="landing-page-root">
      <LandingHeader onLogin={onLogin} />
      <main id="main-content">
        <HeroSection onLogin={onLogin} />
        <StatsBand />
        <ProblemSection />
        <ExistingToolsSection />
        <HowItWorksSection />
        <DifferentiationSection />
        <TrustEngineeringSection />
        <SafetySection />
        <FaqSection />
        <FinalCtaSection onLogin={onLogin} />
      </main>
      <LandingFooter />
    </div>
  );
}
