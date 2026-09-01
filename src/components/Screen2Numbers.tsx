/**
 * @file Screen2Numbers.tsx
 * Demonstrates Screen 2: Numerical & Goal Inputs («Кілька цифр»).
 * Shows automated calculation of protein floor and a healthy calorie corridor (±15%).
 * Strictly adheres to language guidelines (no diet/weight loss goals, framing as corridor & balance).
 */

import React, { useState } from "react";
import { MOCK_NUMBERS_FORM } from "../mockData";

interface Screen2NumbersProps {
  onNext?: () => void;
  onPrev?: () => void;
}

export const Screen2Numbers: React.FC<Screen2NumbersProps> = ({ onNext, onPrev }) => {
  const [budget, setBudget] = useState<number>(MOCK_NUMBERS_FORM.budget);
  const [gender, setGender] = useState<string>(MOCK_NUMBERS_FORM.gender);
  const [activity, setActivity] = useState<string>(MOCK_NUMBERS_FORM.activity);
  const [direction, setDirection] = useState<string>(MOCK_NUMBERS_FORM.direction);
  const [isAdjusting, setIsAdjusting] = useState<boolean>(false);

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
        <span className="app-badge-pill">Крок 2 з 5</span>
      </div>

      {/* Main Content */}
      <div className="app-content">
        <div>
          <h1 className="screen-hero-title">Кілька цифр</h1>
          <p className="screen-sub-title" style={{ marginTop: "4px" }}>
            Використовуємо для розрахунку ситного коридору та вартості кошика.
          </p>
        </div>

        <div className="form-grid">
          {/* Budget slider */}
          <div className="form-card-field">
            <div className="field-label-row">
              <span className="field-label">Бюджет на тиждень</span>
              <span className="field-value-bold" style={{ color: "var(--color-primary-dark)" }}>
                {budget.toLocaleString("uk-UA")} ₴
              </span>
            </div>
            <div className="budget-slider-container">
              <input
                type="range"
                min={MOCK_NUMBERS_FORM.budgetMin}
                max={MOCK_NUMBERS_FORM.budgetMax}
                step={100}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="custom-range-slider"
              />
              <div className="slider-bounds">
                <span>{MOCK_NUMBERS_FORM.budgetMin.toLocaleString("uk-UA")} ₴</span>
                <span>{MOCK_NUMBERS_FORM.budgetMax.toLocaleString("uk-UA")} ₴</span>
              </div>
            </div>
          </div>

          {/* Gender & Age */}
          <div className="form-2col-row">
            <div className="form-card-field">
              <span className="field-label">Стать</span>
              <div className="segmented-control">
                <button
                  type="button"
                  className={`segmented-btn ${gender === "Ж" ? "is-active" : ""}`}
                  onClick={() => setGender("Ж")}
                >
                  Ж
                </button>
                <button
                  type="button"
                  className={`segmented-btn ${gender === "Ч" ? "is-active" : ""}`}
                  onClick={() => setGender("Ч")}
                >
                  Ч
                </button>
              </div>
            </div>

            <div className="input-stat-box">
              <span className="stat-label-tiny">Вік</span>
              <span className="stat-value-big">{MOCK_NUMBERS_FORM.age}</span>
            </div>
          </div>

          {/* Weight & Height */}
          <div className="form-2col-row">
            <div className="input-stat-box">
              <span className="stat-label-tiny">Вага</span>
              <span className="stat-value-big">{MOCK_NUMBERS_FORM.weight} кг</span>
            </div>
            <div className="input-stat-box">
              <span className="stat-label-tiny">Зріст</span>
              <span className="stat-value-big">{MOCK_NUMBERS_FORM.height} см</span>
            </div>
          </div>

          {/* Activity */}
          <div className="form-card-field">
            <span className="field-label">Активність</span>
            <div className="segmented-control">
              {["Низька", "Середня", "Висока"].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  className={`segmented-btn ${activity === lvl ? "is-active" : ""}`}
                  onClick={() => setActivity(lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Direction */}
          <div className="form-card-field">
            <span className="field-label">Напрям</span>
            <div className="segmented-control">
              {["Набір", "Утримання", "Зниження"].map((dir) => (
                <button
                  key={dir}
                  type="button"
                  className={`segmented-btn ${direction === dir ? "is-active" : ""}`}
                  onClick={() => setDirection(dir)}
                >
                  {dir}
                </button>
              ))}
            </div>
          </div>

          {/* HERO COMPUTED RESULT CARD */}
          <div className="hero-computed-card">
            <div className="hero-computed-header">
              <span className="hero-computed-title">Ваша ціль</span>
              <button
                type="button"
                className="hero-computed-link"
                onClick={() => setIsAdjusting(!isAdjusting)}
              >
                {isAdjusting ? "Зберегти" : "Скоригувати"}
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div className="hero-computed-row">
                <span className="hero-metric-label">Білок</span>
                <div className="hero-metric-value-wrap">
                  <span className="hero-metric-value">{MOCK_NUMBERS_FORM.computedProtein} г / добу</span>
                  <span className="hero-metric-note">(мінімум)</span>
                </div>
              </div>

              <div className="hero-computed-row">
                <span className="hero-metric-label">Калорії</span>
                <div className="hero-metric-value-wrap">
                  <span className="hero-metric-value">{MOCK_NUMBERS_FORM.computedCalories.toLocaleString("uk-UA")} ккал</span>
                  <span className="hero-metric-note">(коридор {MOCK_NUMBERS_FORM.caloriesVariance})</span>
                </div>
              </div>
            </div>

            <div className="hero-computed-footer-note">
              Порахували з ваших даних. Можна змінити.
            </div>
          </div>
        </div>

        <div style={{ marginTop: "8px", paddingTop: "8px" }}>
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
