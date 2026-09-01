/**
 * @file Screen5Cart.tsx
 * Demonstrates Screen 5: Cart & Supermarket SKU Confirmation («Перевірте перед оформленням»).
 * Shows mapped supermarket items, promotion tags, out-of-stock replacement resolution,
 * loyalty bonus deduction toggle, and handover to the retailer's checkout application («Сільпо»).
 */

import React, { useState } from "react";
import { MOCK_CART_ITEMS, MOCK_CART_SUMMARY } from "../mockData";

interface Screen5CartProps {
  onPrev?: () => void;
  onRestart?: () => void;
}

export const Screen5Cart: React.FC<Screen5CartProps> = ({ onPrev, onRestart }) => {
  const [bonusesActive, setBonusesActive] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState(MOCK_CART_ITEMS);
  const [showHandoverToast, setShowHandoverToast] = useState<boolean>(false);

  const subtotal = MOCK_CART_SUMMARY.subtotal;
  const bonusDiscount = bonusesActive ? MOCK_CART_SUMMARY.bonuses : 0;
  const finalPrice = subtotal - bonusDiscount;

  const handleCheckout = () => {
    setShowHandoverToast(true);
    setTimeout(() => setShowHandoverToast(false), 4000);
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
        <span className="app-badge-pill">Крок 5 з 5</span>
      </div>

      {/* Main Content */}
      <div className="app-content" style={{ gap: "14px" }}>
        <div>
          <h1 className="screen-hero-title">Перевірте перед оформленням</h1>
          <p className="screen-sub-title" style={{ marginTop: "4px" }}>
            Зібрали продукти під рецепти за найкращими цінами мережі.
          </p>
        </div>

        {/* 7 Line Items List */}
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className={`cart-item-row ${item.isReplacement ? "is-replacement" : ""}`}
            >
              <div className="cart-item-main">
                <div className="cart-item-info">
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                    <span className="cart-item-name">{item.name}</span>
                    {item.isPromo && (
                      <span className="dish-pill-promo" style={{ fontSize: "10px", padding: "2px 6px" }}>
                        Акція
                      </span>
                    )}
                  </div>
                  <span className="cart-item-pack">{item.packSize}</span>
                </div>

                <div className="cart-item-pricing">
                  <div className="cart-item-price">{item.price} ₴</div>
                  <div className="cart-item-qty">{item.quantity} шт</div>
                </div>
              </div>

              {/* One Row Out-of-Stock Replacement Notice */}
              {item.isReplacement && (
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <div className="cart-replacement-alert">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{item.replacementNote}</span>
                  </div>
                  <span className="cart-replacement-sub">{item.replacementOriginal}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Cart Summary Block */}
        <div className="cart-summary-block">
          <div className="cart-summary-line">
            <span>Разом</span>
            <span style={{ fontWeight: 700, color: "var(--color-text-hero)" }}>
              {subtotal.toLocaleString("uk-UA")} ₴
            </span>
          </div>

          <div className="cart-bonus-row">
            <div className="cart-bonus-left">
              <div
                className={`bonus-toggle-switch ${!bonusesActive ? "is-off" : ""}`}
                onClick={() => setBonusesActive(!bonusesActive)}
                title="Увімкнути / вимкнути списання балобонусів"
              >
                <div className="bonus-toggle-handle" />
              </div>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-main)" }}>
                Балобонуси
              </span>
            </div>
            <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--color-silpo-orange-dark)" }}>
              −{MOCK_CART_SUMMARY.bonuses} ₴
            </span>
          </div>

          <div className="cart-final-pay-row">
            <span className="cart-final-label">До сплати</span>
            <span className="cart-final-amount">
              {finalPrice.toLocaleString("uk-UA")} ₴
            </span>
          </div>
        </div>

        {/* Handover feedback toast */}
        {showHandoverToast && (
          <div style={{
            fontSize: "11px",
            backgroundColor: "var(--color-peach-light)",
            border: "1px solid var(--color-border-orange-subtle)",
            color: "var(--color-silpo-orange-dark)",
            padding: "8px 10px",
            borderRadius: "var(--radius-sm)",
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.35
          }}>
            Передаємо кошик у додаток «Сільпо» для вибору слота доставки...
          </div>
        )}

        <div className="cart-retailer-note">
          {MOCK_CART_SUMMARY.retailerNotice}
        </div>

        {/* Handover Button */}
        <div style={{ marginTop: "auto", paddingTop: "6px" }}>
          <button
            type="button"
            className="btn-primary"
            onClick={handleCheckout}
          >
            <span>Перейти до оформлення</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
