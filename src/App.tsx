import React, { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { PrototypePresentation } from "./components/PrototypePresentation";

export default function App() {
  const [currentView, setCurrentView] = useState<"landing" | "prototype">("landing");

  const handleLogin = () => {
    console.log("login");
    setCurrentView("prototype");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToLanding = () => {
    setCurrentView("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  if (currentView === "prototype") {
    return <PrototypePresentation onBackToLanding={handleBackToLanding} />;
  }

  return <LandingPage onLogin={handleLogin} />;
}
