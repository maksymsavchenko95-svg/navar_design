/**
 * @file Screen4Plan.tsx
 * Demonstrates Screen 4: The 5-Day Weekly Menu Plan («The Money Shot»).
 * Displays hero financial/nutrient metrics (2 340 ₴ / 2 400 ₴, 310 ₴ promo savings, 137-148g protein),
 * horizontal weekday rail, an honest constraint notice, dish cards with promotion badges and replacement chevrons,
 * plus pinned action buttons («Зібрати кошик», «Дешевше на 300 ₴»).
 */

import React, { useState } from "react";
import { MOCK_PLAN_DATA } from "../mockData";

interface Screen4PlanProps {
  onNext?: () => void;
  onPrev?: () => void;
}

export const Screen4Plan: React.FC<Screen4PlanProps> = ({ onNext, onPrev }) => {
  const [selectedDay, setSelectedDay] = useState<string>("mon");
  const [dishes, setDishes] = useState(MOCK_PLAN_DATA.dishes);
  const [replacedToast, setReplacedToast] = useState<string | null>(null);

  const handleReplaceDish = (dishId: string, currentName: string) => {
    // Interactive replacement demo
    const alternativeName = currentName.includes("Курка")
      ? "Філе індички з кіноа та спаржею"
      : currentName.includes("Сирники")
      ? "Запіканка з ягодами та рікотою"
      : "Курячі котлети на пару з пюре";

    setDishes(
      dishes.map((d) =>
        d.id === dishId
          ? { ...d, name: alternativeName, price: d.price + 20 }
          : d
      )
    );

    setReplacedToast(`Замінили «${currentName}»`);
    setTimeout(() => setReplacedToast(null), 2500);
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
        <span className="app-badge-pill">Крок 4 з 5</span>
      </div>

      {/* Main Content */}
      <div className="app-content" style={{ gap: "12px" }}>
        {/* Top Summary Hero Card */}
        <div className="plan-summary-card">
          <div className="plan-summary-price-row">
            <span className="plan-hero-price">
              Тиждень на {MOCK_PLAN_DATA.totalSpent.toLocaleString("uk-UA")} ₴
            </span>
            <span className="plan-budget-limit">
              з {MOCK_PLAN_DATA.totalBudget.toLocaleString("uk-UA")} ₴
            </span>
          </div>

          <div className="plan-pills-row">
            <span className="pill-amber-promo">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>Зекономлено {MOCK_PLAN_DATA.savedPromo} ₴ на акціях</span>
            </span>

            <span className="pill-teal-protein">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Білок: {MOCK_PLAN_DATA.proteinRange}</span>
            </span>
          </div>
        </div>

        {/* Weekday Rail */}
        <div className="weekday-rail">
          {MOCK_PLAN_DATA.days.map((day) => (
            <button
              key={day.key}
              type="button"
              className={`weekday-btn ${selectedDay === day.key ? "is-active" : ""}`}
              onClick={() => setSelectedDay(day.key)}
            >
              {day.label}
            </button>
          ))}
        </div>

        {/* Honest Constraint Notice */}
        <div className="conflict-notice-box">
          <div className="conflict-notice-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <span>{MOCK_PLAN_DATA.conflictNotice}</span>
        </div>

        {/* Replaced Toast Feedback if any */}
        {replacedToast && (
          <div style={{
            fontSize: "11px",
            backgroundColor: "var(--color-primary-tint)",
            color: "var(--color-primary-dark)",
            padding: "6px 10px",
            borderRadius: "var(--radius-sm)",
            fontWeight: 700,
            textAlign: "center"
          }}>
            {replacedToast}
          </div>
        )}

        {/* 5 Dinner Dishes List */}
        <div className="dishes-list">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="dish-card"
              onClick={() => handleReplaceDish(dish.id, dish.name)}
              title="Натисніть, щоб замінити страву"
            >
              <div className="dish-card-header">
                <span className="dish-card-title">{dish.name}</span>
                <span className="dish-replace-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </span>
              </div>

              <div className="dish-meta-row">
                <span className="dish-pill-meta">{dish.cookTime}</span>
                <span className="dish-pill-meta" style={{ fontWeight: 800, color: "var(--color-text-hero)" }}>
                  {dish.price} ₴
                </span>
                <span className="dish-pill-protein">
                  {dish.protein} г білка
                </span>
                {dish.isPromo && (
                  <span className="dish-pill-promo">
                    Акція
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pinned Bottom Actions */}
        <div className="plan-pinned-actions">
          <button type="button" className="btn-primary" onClick={onNext}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span>Зібрати кошик</span>
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => alert("Оптимізуємо меню на -300 ₴ за рахунок сезонних овочів та акційних круп.")}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
            <span>Дешевше на 300 ₴</span>
          </button>
        </div>
      </div>
    </div>
  );
};
