/**
 * @file Screen1Goal.tsx
 * Demonstrates Screen 1: Goal Selection («Що плануємо?»).
 * Shows the single-engine architecture with two constraint sets («Рутина» vs «Форма»).
 * Selected state defaults to «Форма» to demonstrate nutrient-driven planning.
 */

import React, { useState, useEffect } from "react";
import { MOCK_GOAL_CARDS } from "../mockData";

interface Screen1GoalProps {
  onNext?: () => void;
  onSelectMode?: (mode: string) => void;
  mode?: "form" | "routine";
}

export const Screen1Goal: React.FC<Screen1GoalProps> = ({ onNext, onSelectMode, mode = "form" }) => {
  const [selectedGoal, setSelectedGoal] = useState<string>(mode);

  useEffect(() => {
    setSelectedGoal(mode);
  }, [mode]);

  const handleSelect = (id: string) => {
    setSelectedGoal(id);
    if (onSelectMode) onSelectMode(id);
  };

  return (
    <div className="screen-wrapper">
      {/* Screen App Bar */}
      <div className="app-screen-header">
        <div className="app-screen-brand">
          <div className="app-logo-badge">N</div>
          <span className="app-brand-title">NAVAR</span>
        </div>
        <span className="app-badge-pill">Крок 1 з 5</span>
      </div>

      {/* Main Content */}
      <div className="app-content">
        <div>
          <h1 className="screen-hero-title">Що плануємо?</h1>
          <p className="screen-sub-title" style={{ marginTop: "4px" }}>
            Оберіть формат тижневого кошика. Алгоритм підлаштує меню під ваші завдання.
          </p>
        </div>

        <div className="goal-card-stack">
          {MOCK_GOAL_CARDS.map((card) => {
            const isSelected = selectedGoal === card.id;
            return (
              <button
                key={card.id}
                type="button"
                className={`goal-card ${isSelected ? "is-selected" : ""}`}
                onClick={() => handleSelect(card.id)}
              >
                <div className="goal-card-top">
                  <div className="goal-card-icon-box">
                    {card.id === "routine" ? (
                      /* Routine Icon: Family / Pot */
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 11v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        <circle cx="12" cy="15" r="1.5" />
                        <path d="M8 3v2M16 3v2" />
                      </svg>
                    ) : (
                      /* Form Icon: Target / Balance / Macro */
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v10" />
                        <path d="M7 12h10" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </div>

                  <div className="goal-radio-circle">
                    {isSelected && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>

                <div>
                  <div className="goal-card-title">{card.title}</div>
                  <div className="goal-card-subtitle">{card.subtitle}</div>
                </div>

                <div className="goal-card-desc">{card.description}</div>
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: "auto", paddingTop: "16px" }}>
          <button type="button" className="btn-primary" onClick={onNext}>
            <span>Далі</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
