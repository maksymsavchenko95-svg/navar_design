import React from "react";
import { LANDING_CONTENT } from "../../content";
import { useInView } from "../../hooks/useInView";
import { PhoneFrame } from "../PhoneFrame";
import { Screen1Goal } from "../Screen1Goal";
import { Screen2Numbers } from "../Screen2Numbers";
import { Screen3Tastes } from "../Screen3Tastes";
import { Screen4Plan } from "../Screen4Plan";
import { Screen5Cart } from "../Screen5Cart";

function MiniAppScreen({ stepIndex, appMode = "form", scale = 0.85 }: { stepIndex: number; appMode?: "form" | "routine"; scale?: number }) {
  return (
    <div
      className="mini-screen-wrapper"
      style={{
        width: `${340 * scale}px`,
        height: `${640 * scale}px`,
        position: "relative",
        borderRadius: `${40 * scale}px`,
        flexShrink: 0,
        margin: "0 auto",
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2)",
        backgroundColor: "#12100E",
      }}
      aria-hidden="true"
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
          width: "340px",
          height: "640px",
          pointerEvents: "none",
        }}
      >
        <PhoneFrame activeScreenId={stepIndex}>
          {stepIndex === 1 && <Screen1Goal mode={appMode} />}
          {stepIndex === 2 && <Screen2Numbers mode={appMode} />}
          {stepIndex === 3 && <Screen3Tastes />}
          {stepIndex === 4 && <Screen4Plan />}
          {stepIndex === 5 && <Screen5Cart />}
        </PhoneFrame>
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      className={`landing-how-section ${isInView ? "reveal-in" : ""}`}
      ref={ref}
      id="how-it-works"
      aria-labelledby="how-title"
    >
      <div className="landing-section-container">
        <div className="section-eyebrow-center">
          <span className="landing-eyebrow-pill">{LANDING_CONTENT.howItWorks.eyebrow}</span>
        </div>

        <h2 className="editorial-section-title" id="how-title">
          {LANDING_CONTENT.howItWorks.title}
        </h2>

        {/* 5-Step Zigzag Flow using Real Mini Screens */}
        <div className="how-steps-flow">
          {LANDING_CONTENT.howItWorks.steps.map((stepItem, idx) => {
            const isEven = idx % 2 === 1;

            if (stepItem.step === 2) {
              return (
                <React.Fragment key={stepItem.step}>
                  {/* Step 2 - Form */}
                  <div
                    className={`how-step-card ${isEven ? "step-reversed" : ""}`}
                    id={`how-step-2-form`}
                  >
                    <div className="step-text-col">
                      <div className="step-badge-row">
                        <span className="step-number-tile">2</span>
                        <span className="step-badge-pill">Спортивна форма</span>
                      </div>
                      <h3 className="step-title">{stepItem.title}</h3>
                      <p className="step-desc">
                        Для тих, хто тренується або тримає форму. Вкажіть вагу, зріст та активність — алгоритм миттєво розрахує вашу норму калорій та мінімум білка на день.
                      </p>
                      <ul className="step-details-list">
                        <li className="step-detail-item">Точний розрахунок БЖВ</li>
                        <li className="step-detail-item">Врахування напрямку (набір/сушка)</li>
                      </ul>
                    </div>
                    <div className="step-visual-col">
                      <MiniAppScreen stepIndex={2} appMode="form" scale={0.85} />
                    </div>
                  </div>

                  {/* Step 2 - Routine (Injected) */}
                  <div
                    className={`how-step-card ${!isEven ? "step-reversed" : ""}`}
                    id={`how-step-2-routine`}
                  >
                    <div className="step-text-col">
                      <div className="step-badge-row">
                        <span className="step-number-tile">Або</span>
                        <span className="step-badge-pill" style={{ backgroundColor: "var(--color-silpo-orange)", color: "#fff", borderColor: "var(--color-silpo-orange)" }}>Сімейна рутина</span>
                      </div>
                      <h3 className="step-title">Планування на родину</h3>
                      <p className="step-desc">
                        Знімає головний біль сімейних закупівель. Вкажіть кількість дорослих і дітей — Navar збере оптимальний кошик, щоб усім вистачило їжі на весь тиждень, не виходячи за рамки бюджету.
                      </p>
                      <ul className="step-details-list">
                        <li className="step-detail-item">Автоматичне масштабування порцій</li>
                        <li className="step-detail-item">Ситний коридор на кожного члена родині</li>
                      </ul>
                    </div>
                    <div className="step-visual-col">
                      <MiniAppScreen stepIndex={2} appMode="routine" scale={0.85} />
                    </div>
                  </div>
                </React.Fragment>
              );
            }

            return (
              <div
                key={stepItem.step}
                className={`how-step-card ${idx > 1 ? (idx % 2 === 0 ? "step-reversed" : "") : isEven ? "step-reversed" : ""}`}
                id={`how-step-${stepItem.step}`}
              >
                <div className="step-text-col">
                  <div className="step-badge-row">
                    <span className="step-number-tile">{stepItem.step}</span>
                    <span className="step-badge-pill">{stepItem.badge}</span>
                  </div>

                  <h3 className="step-title">{stepItem.title}</h3>
                  <p className="step-desc">{stepItem.description}</p>

                  <ul className="step-details-list">
                    {stepItem.details.map((detail, dIdx) => (
                      <li key={dIdx} className="step-detail-item">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="step-visual-col">
                  <MiniAppScreen stepIndex={stepItem.step} scale={0.85} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
