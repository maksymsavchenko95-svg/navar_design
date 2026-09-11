#!/bin/bash
cat << 'REPLACE' > header_replacement.txt
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
REPLACE

# Use perl to replace the exact block
perl -0777 -pi -e 's/<div className="phone-header.*?<\/div>\s*<\/div>\s*<\/div>/`cat header_replacement.txt`/se' src/components/Screen2Numbers.tsx
