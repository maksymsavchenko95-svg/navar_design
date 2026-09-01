/**
 * @file Screen3Tastes.tsx
 * Demonstrates Screen 3: Receipt-Informed Taste Personalization («Здається, ми вас уже трохи знаємо»).
 * Pre-filled from historical supermarket loyalty data, emphasizing high-confidence defaults
 * with easy removal (×), restoration (+), and allergen exclusion constraints.
 */

import React, { useState } from "react";
import { MOCK_TASTES } from "../mockData";

interface Screen3TastesProps {
  onNext?: () => void;
  onPrev?: () => void;
}

export const Screen3Tastes: React.FC<Screen3TastesProps> = ({ onNext, onPrev }) => {
  const [oftenBought, setOftenBought] = useState<string[]>(MOCK_TASTES.oftenBought);
  const [rarelyBought, setRarelyBought] = useState<string[]>(MOCK_TASTES.rarelyBought);
  const [allergies, setAllergies] = useState<string[]>(MOCK_TASTES.allergies);
  const [customDislike, setCustomDislike] = useState<string>("");

  const handleRemoveOften = (item: string) => {
    setOftenBought(oftenBought.filter((i) => i !== item));
    setRarelyBought([...rarelyBought, item]);
  };

  const handleAddRare = (item: string) => {
    setRarelyBought(rarelyBought.filter((i) => i !== item));
    setOftenBought([...oftenBought, item]);
  };

  const handleRemoveAllergy = (item: string) => {
    setAllergies(allergies.filter((i) => i !== item));
  };

  return (
    <div className="screen-wrapper">
      {/* Screen App Bar */}
      <div className="app-screen-header">
        <div className="app-screen-brand">
          <button type="button" onClick={onPrev} style={{ display: "flex", alignItems: "center", color: "var(--color-text-muted)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <div className="app-logo-badge">N</div>
          <span className="app-brand-title">NAVAR</span>
        </div>
        <span className="app-badge-pill">Крок 3 з 5</span>
      </div>

      {/* Main Content */}
      <div className="app-content">
        <div>
          <h1 className="screen-hero-title">Здається, ми вас уже трохи знаємо</h1>
          <p className="screen-sub-title" style={{ marginTop: "4px" }}>
            Зібрали з ваших чеків. Виправте, якщо помилились.
          </p>
        </div>

        {/* 1. Often Bought (Active filled chips) */}
        <div className="tastes-group">
          <div className="tastes-group-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-silpo-orange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span>Часто берете</span>
          </div>
          <div className="chips-cloud">
            {oftenBought.map((item) => (
              <span key={item} className="chip-active">
                <span>{item}</span>
                <button
                  type="button"
                  className="chip-remove-btn"
                  onClick={() => handleRemoveOften(item)}
                  title="Видалити"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* 2. Rarely Bought (Outlined chips with +) */}
        <div className="tastes-group">
          <div className="tastes-group-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            <span>Схоже, не берете</span>
          </div>
          <div className="chips-cloud">
            {rarelyBought.map((item) => (
              <button
                key={item}
                type="button"
                className="chip-muted"
                onClick={() => handleAddRare(item)}
                title="Додати у меню"
              >
                <span>{item}</span>
                <span className="chip-add-icon">+</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Allergies and Restrictions (Visually Heaviest Box) */}
        <div className="allergies-container">
          <div className="allergies-title-row">
            <div className="allergies-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span>Алергії та обмеження</span>
            </div>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-warning-text)" }}>
              Суворе виключення
            </span>
          </div>

          <div className="chips-cloud">
            {allergies.map((item) => (
              <span key={item} className="chip-allergy">
                <span>{item}</span>
                <button
                  type="button"
                  className="chip-remove-btn"
                  onClick={() => handleRemoveAllergy(item)}
                  style={{ color: "var(--color-warning-text)" }}
                  title="Видалити обмеження"
                >
                  ×
                </button>
              </span>
            ))}
            <button
              type="button"
              className="chip-add-new"
              onClick={() => {
                const name = prompt("Вкажіть алергію або інгредієнт для виключення:");
                if (name) setAllergies([...allergies, name]);
              }}
            >
              <span>+ Додати</span>
            </button>
          </div>
        </div>

        {/* Ghost text field */}
        <div className="ghost-search-field-container">
          <svg className="ghost-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            className="ghost-search-field"
            placeholder="Додати те, чого не любите..."
            value={customDislike}
            onChange={(e) => setCustomDislike(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "auto", paddingTop: "12px" }}>
          <button type="button" className="btn-primary" onClick={onNext}>
            <span>Скласти план</span>
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
