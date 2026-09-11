import React, { useState, useEffect, useRef } from "react";
import { PhoneFrame } from "./PhoneFrame";
import { Screen1Goal } from "./Screen1Goal";
import { Screen2Numbers } from "./Screen2Numbers";
import { Screen3Tastes } from "./Screen3Tastes";
import { Screen4Plan } from "./Screen4Plan";
import { Screen5Cart } from "./Screen5Cart";
import { PITCH_SECTIONS } from "../mockData";

interface PrototypePresentationProps {
  onBackToLanding?: () => void;
}

export function PrototypePresentation({ onBackToLanding }: PrototypePresentationProps) {
  const [activeScreenId, setActiveScreenId] = useState<number>(1);
  const isProgrammaticScroll = useRef<boolean>(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // IntersectionObserver to link right-column scroll with left-column phone screen
  useEffect(() => {
    const handleIntersection: IntersectionObserverCallback = (entries) => {
      if (isProgrammaticScroll.current) return;

      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleEntry) {
        const id = Number(visibleEntry.target.getAttribute("data-screen-id"));
        if (id && id !== activeScreenId) {
          setActiveScreenId(id);
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "-20% 0px -40% 0px",
      threshold: [0.2, 0.5, 0.8],
    });

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [activeScreenId]);

  // Jump to specific screen and scroll corresponding section into view
  const handleJumpToScreen = (id: number) => {
    setActiveScreenId(id);
    isProgrammaticScroll.current = true;

    const targetSection = document.getElementById(`pitch-section-${id}`);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 600);
  };

  const handleNext = () => {
    if (activeScreenId < 5) {
      handleJumpToScreen(activeScreenId + 1);
    }
  };

  const handlePrev = () => {
    if (activeScreenId > 1) {
      handleJumpToScreen(activeScreenId - 1);
    }
  };

  // Render the active screen component inside the phone
  const renderScreen = () => {
    switch (activeScreenId) {
      case 1:
        return <Screen1Goal onNext={handleNext} />;
      case 2:
        return <Screen2Numbers onNext={handleNext} onPrev={handlePrev} />;
      case 3:
        return <Screen3Tastes onNext={handleNext} onPrev={handlePrev} />;
      case 4:
        return <Screen4Plan onNext={handleNext} onPrev={handlePrev} />;
      case 5:
        return <Screen5Cart onPrev={handlePrev} onRestart={() => handleJumpToScreen(1)} />;
      default:
        return <Screen1Goal onNext={handleNext} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top Presentation Header */}
      <header className="presentation-header" id="header-bar">
        <div className="presentation-header-inner">
          <div className="brand-wrapper">
            <div className="brand-logo-box" aria-hidden="true">
              N
            </div>
            <div>
              <div className="brand-name">NAVAR</div>
              <div className="brand-tagline">Щотижневий продуктовий агент для українського ритейлу</div>
            </div>
          </div>

          {/* Return to Landing Page Button */}
          {onBackToLanding && (
            <button
              type="button"
              className="btn-back-to-landing"
              onClick={onBackToLanding}
              id="back-to-landing-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>← До опису проєкту</span>
            </button>
          )}
        </div>
      </header>

      {/* Quick Jump Rail fixed at bottom of screen & centered */}
      <nav className="screen-switcher-nav" aria-label="Навігація по екранах">
        {PITCH_SECTIONS.map((sec) => (
          <button
            key={sec.id}
            type="button"
            className={`screen-switcher-btn ${activeScreenId === sec.id ? "active" : ""}`}
            onClick={() => handleJumpToScreen(sec.id)}
          >
            <span>{sec.stepNumber}</span>
            <span>{sec.badge}</span>
          </button>
        ))}
      </nav>

      {/* Main Two-Column Layout */}
      <main className="presentation-container" id="presentation-main">
        {/* Left Column: Sticky Phone Frame */}
        <section className="phone-column-pedestal" aria-label="Інтерактивний макет застосунку">
          <PhoneFrame activeScreenId={activeScreenId}>
            {renderScreen()}
          </PhoneFrame>
        </section>

        {/* Right Column: 5 Explanatory Pitch Sections (~60%) */}
        <section className="sections-column" aria-label="Опис концепції та рішень">
          {PITCH_SECTIONS.map((section, index) => {
            const isCurrent = activeScreenId === section.id;
            return (
              <article
                key={section.id}
                id={`pitch-section-${section.id}`}
                data-screen-id={section.id}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className={`pitch-section ${isCurrent ? "is-current" : ""}`}
              >
                <div className="pitch-section-header">
                  <span className="pitch-step-badge">
                    <span className="pitch-step-number">{section.stepNumber}</span>
                    {section.badge}
                  </span>
                  <span className="pitch-interactive-hint">
                    Екран {section.id} з 5
                  </span>
                </div>

                <h2 className="pitch-headline">{section.headline}</h2>

                <div className="pitch-paragraphs">
                  {section.paragraphs.map((p, pIndex) => (
                    <p key={pIndex} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                </div>

                <div className="pitch-annotations">
                  <div className="pitch-annotations-title">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    Ключові механіки на цьому кроці
                  </div>
                  {section.annotations.map((ann, aIndex) => (
                    <div key={aIndex} className="pitch-annotation-item">
                      <span className="pitch-annotation-dot" />
                      <div>
                        <span className="pitch-annotation-label">{ann.label}:</span>
                        <span className="pitch-annotation-text">{ann.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}
