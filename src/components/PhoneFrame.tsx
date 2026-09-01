/**
 * @file PhoneFrame.tsx
 * Realistic smartphone shell drawn entirely in CSS.
 * Houses a mobile viewport (390 x 844 logical pixels) with simulated status bar,
 * dynamic island, bezel, home indicator, and animated screen transitions.
 */

import React, { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  activeScreenId: number;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, activeScreenId }) => {
  return (
    <div className="phone-shell">
      <div className="phone-screen-container">
        {/* Status Bar */}
        <div className="phone-status-bar">
          <span className="status-time">09:41</span>

          {/* Dynamic Island / Hardware Island */}
          <div className="dynamic-island">
            <div className="island-camera-dot" />
            <div className="island-sensor-dot" />
          </div>

          {/* Cellular / Wi-Fi / Battery */}
          <div className="status-icons">
            {/* Cellular signal */}
            <svg className="status-icon-svg" viewBox="0 0 24 24">
              <rect x="2" y="16" width="3" height="6" rx="1" />
              <rect x="7" y="12" width="3" height="10" rx="1" />
              <rect x="12" y="8" width="3" height="14" rx="1" />
              <rect x="17" y="4" width="3" height="18" rx="1" />
            </svg>

            {/* Wi-Fi */}
            <svg className="status-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
            </svg>

            {/* Battery */}
            <svg className="status-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
              <line x1="22" y1="11" x2="22" y2="13" />
              <rect x="4" y="9" width="10" height="6" fill="currentColor" rx="1" />
            </svg>
          </div>
        </div>

        {/* Viewport for Screen Component with key to trigger CSS transition */}
        <div className="phone-viewport" id="phone-screen-viewport">
          <div key={activeScreenId} style={{ width: "100%", height: "100%" }}>
            {children}
          </div>
        </div>

        {/* Home Indicator */}
        <div className="phone-home-indicator" />
      </div>
    </div>
  );
};
