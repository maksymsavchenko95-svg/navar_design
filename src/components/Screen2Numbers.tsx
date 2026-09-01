/**
 * @file Screen2Numbers.tsx
 * Demonstrates Screen 2: Numerical & Goal Inputs («Кілька цифр»).
 * Shows automated calculation of protein floor and a healthy calorie corridor (±15%).
 * Strictly adheres to language guidelines (no diet/weight loss goals, framing as corridor & balance).
 */

import React, { useState, useMemo } from "react";
import { MOCK_NUMBERS_FORM } from "../mockData";

interface Screen2NumbersProps {
  onNext?: () => void;
  onPrev?: () => void;
}

export const Screen2Numbers: React.FC<Screen2NumbersProps> = ({ onNext, onPrev }) => {
  const [budget, setBudget] = useState<number>(MOCK_NUMBERS_FORM.budget);
  const [isEditingBudget, setIsEditingBudget] = useState<boolean>(false);
  const [budgetString, setBudgetString] = useState<string>(MOCK_NUMBERS_FORM.budget.toString());

  const [gender, setGender] = useState<string>(MOCK_NUMBERS_FORM.gender);
  const [age, setAge] = useState<number>(MOCK_NUMBERS_FORM.age);
  const [weight, setWeight] = useState<number>(MOCK_NUMBERS_FORM.weight);
  const [height, setHeight] = useState<number>(MOCK_NUMBERS_FORM.height);
  const [activity, setActivity] = useState<string>(MOCK_NUMBERS_FORM.activity);
  const [direction, setDirection] = useState<string>(MOCK_NUMBERS_FORM.direction);
  
  const [isCustomOverride, setIsCustomOverride] = useState<boolean>(false);
  const [customProtein, setCustomProtein] = useState<number>(135);
  const [customCalories, setCustomCalories] = useState<number>(2250);

  // Dynamic calculation based on physical inputs
  const calculatedMetrics = useMemo(() => {
    // Standard Mifflin-St Jeor equation for basal metabolic rate
    const bmr = gender === "Ч"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

    // Activity multiplier
    const actFactor = activity === "Низька" ? 1.25 : activity === "Середня" ? 1.45 : 1.7;

    // Direction adjustment
    const dirOffset = direction === "Набір" ? 250 : direction === "Зниження" ? -250 : 0;

    // Target Calories (rounded to nearest 50)
    const calories = Math.round((bmr * actFactor + dirOffset) / 50) * 50;

    // Protein calculation (g/kg basis based on goal & gender)
    const proteinFactor = gender === "Ч"
      ? (direction === "Набір" ? 1.85 : direction === "Зниження" ? 1.75 : 1.7)
      : (direction === "Набір" ? 1.65 : direction === "Зниження" ? 1.55 : 1.45);
    
    const protein = Math.round(weight * proteinFactor);

    return {
      protein: Math.max(60, protein),
      calories: Math.max(1400, calories)
    };
  }, [gender, weight, height, age, activity, direction]);

  const activeProtein = isCustomOverride ? customProtein : calculatedMetrics.protein;
  const activeCalories = isCustomOverride ? customCalories : calculatedMetrics.calories;

  const handleBudgetSubmit = () => {
    const parsed = parseInt(budgetString.replace(/\D/g, ""), 10);
    if (!isNaN(parsed) && parsed >= 500 && parsed <= 15000) {
      setBudget(parsed);
    } else {
      setBudgetString(budget.toString());
    }
    setIsEditingBudget(false);
  };

  return (
    <div className="screen-wrapper">
      {/* Screen App Bar */}
      <div className="app-screen-header">
        <div className="app-screen-brand">
          <button type="button" onClick={onPrev} className="app-back-btn" aria-label="Назад">
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
          {/* Budget slider with interactive precision number editor */}
          <div className="form-card-field">
            <div className="field-label-row">
              <span className="field-label">Бюджет на тиждень</span>
              
              {isEditingBudget ? (
                <div className="budget-inline-editor">
                  <input
                    type="number"
                    value={budgetString}
                    onChange={(e) => setBudgetString(e.target.value)}
                    onBlur={handleBudgetSubmit}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleBudgetSubmit();
                    }}
                    autoFocus
                    className="budget-number-input"
                  />
                  <button type="button" onClick={handleBudgetSubmit} className="budget-confirm-btn">
                    OK
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setBudgetString(budget.toString());
                    setIsEditingBudget(true);
                  }}
                  className="budget-value-trigger"
                  title="Натисніть, щоб ввести точну суму вручну"
                >
                  <span className="field-value-bold">{budget.toLocaleString("uk-UA")} ₴</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="budget-edit-pencil">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  </svg>
                </button>
              )}
            </div>

            <div className="budget-slider-container">
              <input
                type="range"
                min={MOCK_NUMBERS_FORM.budgetMin}
                max={MOCK_NUMBERS_FORM.budgetMax}
                step={50}
                value={budget}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setBudget(val);
                  setBudgetString(val.toString());
                }}
                className="custom-range-slider"
                style={{
                  background: `linear-gradient(to right, #F35B04 0%, #F35B04 ${((budget - MOCK_NUMBERS_FORM.budgetMin) / (MOCK_NUMBERS_FORM.budgetMax - MOCK_NUMBERS_FORM.budgetMin)) * 100}%, #E5E0D8 ${((budget - MOCK_NUMBERS_FORM.budgetMin) / (MOCK_NUMBERS_FORM.budgetMax - MOCK_NUMBERS_FORM.budgetMin)) * 100}%, #E5E0D8 100%)`
                }}
              />
              <div className="slider-bounds">
                <span>{MOCK_NUMBERS_FORM.budgetMin.toLocaleString("uk-UA")} ₴</span>
                <span>{MOCK_NUMBERS_FORM.budgetMax.toLocaleString("uk-UA")} ₴</span>
              </div>
            </div>
          </div>

          {/* Gender & Age (With tactile inputs) */}
          <div className="form-2col-row">
            <div className="form-card-field">
              <span className="field-label">Стать</span>
              <div className="segmented-control tactile-segmented">
                <button
                  type="button"
                  className={`segmented-btn ${gender === "Ж" ? "is-active" : ""}`}
                  onClick={() => setGender("Ж")}
                  aria-label="Жіноча стать"
                >
                  Ж
                </button>
                <button
                  type="button"
                  className={`segmented-btn ${gender === "Ч" ? "is-active" : ""}`}
                  onClick={() => setGender("Ч")}
                  aria-label="Чоловіча стать"
                >
                  Ч
                </button>
              </div>
            </div>

            {/* Age: Explicit interactive input field */}
            <div className="tactile-input-card">
              <label htmlFor="input-age" className="tactile-input-label">Вік</label>
              <div className="tactile-input-wrapper">
                <input
                  id="input-age"
                  type="number"
                  min="16"
                  max="99"
                  value={age}
                  onChange={(e) => setAge(Math.max(16, Math.min(99, Number(e.target.value) || 16)))}
                  className="tactile-numeric-input"
                />
                <span className="tactile-input-unit">р.</span>
              </div>
            </div>
          </div>

          {/* Weight & Height (Explicit interactive input fields) */}
          <div className="form-2col-row">
            {/* Weight */}
            <div className="tactile-input-card">
              <label htmlFor="input-weight" className="tactile-input-label">Вага</label>
              <div className="tactile-input-wrapper">
                <input
                  id="input-weight"
                  type="number"
                  min="40"
                  max="180"
                  value={weight}
                  onChange={(e) => setWeight(Math.max(35, Math.min(220, Number(e.target.value) || 40)))}
                  className="tactile-numeric-input"
                />
                <span className="tactile-input-unit">кг</span>
              </div>
            </div>

            {/* Height */}
            <div className="tactile-input-card">
              <label htmlFor="input-height" className="tactile-input-label">Зріст</label>
              <div className="tactile-input-wrapper">
                <input
                  id="input-height"
                  type="number"
                  min="120"
                  max="220"
                  value={height}
                  onChange={(e) => setHeight(Math.max(100, Math.min(230, Number(e.target.value) || 120)))}
                  className="tactile-numeric-input"
                />
                <span className="tactile-input-unit">см</span>
              </div>
            </div>
          </div>

          {/* Activity (Tactile Segmented) */}
          <div className="form-card-field">
            <span className="field-label">Активність</span>
            <div className="segmented-control tactile-segmented">
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

          {/* Direction (Tactile Segmented) */}
          <div className="form-card-field">
            <span className="field-label">Напрям</span>
            <div className="segmented-control tactile-segmented">
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

          {/* HERO COMPUTED RESULT CARD (Frosted Glass with Live Targets) */}
          <div className="hero-computed-card frosted-glass-dark">
            <div className="hero-computed-header">
              <div className="hero-computed-title-wrap">
                <span className="hero-computed-dot" />
                <span className="hero-computed-title">Ваша ціль</span>
              </div>
              <button
                type="button"
                className="hero-computed-link"
                onClick={() => {
                  if (!isCustomOverride) {
                    setCustomProtein(calculatedMetrics.protein);
                    setCustomCalories(calculatedMetrics.calories);
                  }
                  setIsCustomOverride(!isCustomOverride);
                }}
              >
                {isCustomOverride ? "Скинути до авто" : "Скоригувати"}
              </button>
            </div>

            {/* Direct Information Visibility: Prominently Displayed Targets */}
            <div className="hero-metrics-grid">
              <div className="hero-metric-tile">
                <div className="hero-metric-tile-header">
                  <span className="hero-metric-label">Білок</span>
                  <span className="hero-metric-badge-mini">мінімум</span>
                </div>
                {isCustomOverride ? (
                  <div className="hero-metric-inline-edit">
                    <input
                      type="number"
                      value={customProtein}
                      onChange={(e) => setCustomProtein(Number(e.target.value))}
                      className="hero-metric-input"
                    />
                    <span className="hero-metric-unit">г/добу</span>
                  </div>
                ) : (
                  <div className="hero-metric-value-display">
                    <span className="hero-metric-num">{activeProtein}</span>
                    <span className="hero-metric-unit">г / добу</span>
                  </div>
                )}
              </div>

              <div className="hero-metric-tile">
                <div className="hero-metric-tile-header">
                  <span className="hero-metric-label">Калорії</span>
                  <span className="hero-metric-badge-mini">±15% коридор</span>
                </div>
                {isCustomOverride ? (
                  <div className="hero-metric-inline-edit">
                    <input
                      type="number"
                      value={customCalories}
                      onChange={(e) => setCustomCalories(Number(e.target.value))}
                      className="hero-metric-input"
                    />
                    <span className="hero-metric-unit">ккал</span>
                  </div>
                ) : (
                  <div className="hero-metric-value-display">
                    <span className="hero-metric-num">{activeCalories.toLocaleString("uk-UA")}</span>
                    <span className="hero-metric-unit">ккал</span>
                  </div>
                )}
              </div>
            </div>

            <div className="hero-computed-footer-note">
              Автоматично розраховано з ваших {weight} кг, {height} см та активності.
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
