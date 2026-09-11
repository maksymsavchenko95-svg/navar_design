import React, { useState, useMemo, useEffect } from "react";
import { MOCK_NUMBERS_FORM } from "../mockData";

interface Screen2NumbersProps {
  onNext?: () => void;
  onPrev?: () => void;
  mode?: "form" | "routine";
}

export const Screen2Numbers: React.FC<Screen2NumbersProps> = ({ onNext, onPrev, mode = "form" }) => {
  const [budget, setBudget] = useState<number>(MOCK_NUMBERS_FORM.budget);
  const [isEditingBudget, setIsEditingBudget] = useState<boolean>(false);
  const [budgetString, setBudgetString] = useState<string>(MOCK_NUMBERS_FORM.budget.toString());

  const [adults, setAdults] = useState<number>(mode === "routine" ? 2 : 1);
  const [children, setChildren] = useState<number>(mode === "routine" ? 1 : 0);

  useEffect(() => {
    if (mode === "routine") {
      setAdults(2);
      setChildren(1);
    } else {
      setAdults(1);
      setChildren(0);
    }
  }, [mode]);

  const [gender, setGender] = useState<string>(MOCK_NUMBERS_FORM.gender);
  const [age, setAge] = useState<number>(MOCK_NUMBERS_FORM.age);
  const [weight, setWeight] = useState<number>(MOCK_NUMBERS_FORM.weight);
  const [height, setHeight] = useState<number>(MOCK_NUMBERS_FORM.height);
  const [activity, setActivity] = useState<string>(MOCK_NUMBERS_FORM.activity);
  const [direction, setDirection] = useState<string>(MOCK_NUMBERS_FORM.direction);

  const [isCustomOverride, setIsCustomOverride] = useState(false);
  const [customProtein, setCustomProtein] = useState<number>(0);
  const [customCalories, setCustomCalories] = useState<number>(0);

  // Simple visual formulas for the prototype
  const calculatedMetrics = useMemo(() => {
    let baseCals = gender === "Ч" ? 2200 : 1800;
    if (activity === "Висока") baseCals += 400;
    if (activity === "Низька") baseCals -= 300;
    
    if (direction === "Набір") baseCals += 300;
    if (direction === "Зниження") baseCals -= 400;

    const baseProtein = weight * (activity === "Висока" ? 1.8 : 1.4);
    
    return {
      calories: Math.round(baseCals / 50) * 50,
      protein: Math.round(baseProtein)
    };
  }, [gender, weight, activity, direction]);

  const activeCalories = isCustomOverride ? customCalories : calculatedMetrics.calories;
  const activeProtein = isCustomOverride ? customProtein : calculatedMetrics.protein;

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

      <div className="app-content">
        <div>
          <h1 className="screen-hero-title">Кілька цифр</h1>
          <p className="screen-sub-title" style={{ marginTop: "4px" }}>
            Використовуємо для розрахунку ситного коридору та вартості кошика.
          </p>
        </div>

        <div className="form-blocks-stack">
          {/* Budget Block */}
          <div className="form-card-field" style={{ position: "relative" }}>
            <div className="field-label-row">
              <span className="field-label uppercase text-xs tracking-wider">Бюджет на тиждень</span>
              
              {isEditingBudget ? (
                <div className="budget-edit-wrapper">
                  <input
                    type="number"
                    autoFocus
                    className="budget-inline-input"
                    value={budgetString}
                    onChange={(e) => setBudgetString(e.target.value)}
                    onBlur={() => {
                      const val = Number(budgetString);
                      if (val >= MOCK_NUMBERS_FORM.budgetMin && val <= MOCK_NUMBERS_FORM.budgetMax) {
                        setBudget(val);
                      } else {
                        setBudgetString(budget.toString());
                      }
                      setIsEditingBudget(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.currentTarget.blur();
                      }
                    }}
                  />
                  <span className="budget-inline-unit">₴</span>
                </div>
              ) : (
                <button
                  type="button"
                  className="budget-value-btn"
                  onClick={() => setIsEditingBudget(true)}
                >
                  {budget.toLocaleString("uk-UA")} ₴
                </button>
              )}
            </div>

            <div className="budget-slider-container">
              <input
                type="range"
                min={MOCK_NUMBERS_FORM.budgetMin}
                max={MOCK_NUMBERS_FORM.budgetMax}
                step="100"
                value={budget}
                onChange={(e) => {
                  setBudget(Number(e.target.value));
                  setBudgetString(e.target.value);
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

          <div className="form-card-field">
            <div className="field-label-row">
              <span className="field-label uppercase text-xs tracking-wider">Скільки їдців</span>
              <span className="field-value-bold text-borsch">{adults + children} {(adults + children) === 1 ? 'особу' : (adults + children) >= 5 ? 'осіб' : 'особи'}</span>
            </div>
            <div className="form-2col-row mt-3">
              <div className="tactile-input-card p-3">
                <label className="tactile-input-label uppercase text-[10px] tracking-wider mb-2 block">Дорослі</label>
                <div className="eaters-counter-row">
                  <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} className="eater-btn">-</button>
                  <span className="eater-val">{adults}</span>
                  <button type="button" onClick={() => setAdults(adults + 1)} className="eater-btn">+</button>
                </div>
              </div>
              <div className="tactile-input-card p-3">
                <label className="tactile-input-label uppercase text-[10px] tracking-wider mb-2 block">Діти</label>
                <div className="eaters-counter-row">
                  <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} className="eater-btn">-</button>
                  <span className="eater-val">{children}</span>
                  <button type="button" onClick={() => setChildren(children + 1)} className="eater-btn">+</button>
                </div>
              </div>
            </div>
            {mode === "form" && (
              <p className="eaters-helper-text mt-3 text-xs text-[#828282] leading-tight">
                Ситний коридор рахуємо на одну людину — кількість їдців впливає лише на розмір кошика.
              </p>
            )}
          </div>

          {mode === "form" && (
            <>
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
            </>
          )}

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
