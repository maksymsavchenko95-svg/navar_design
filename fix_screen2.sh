#!/bin/bash
sed -i 's/<div className="phone-screen form-screen">/<div className="screen-wrapper">/g' src/components/Screen2Numbers.tsx
sed -i 's/<div className="phone-scroll-content pb-24">/<div className="app-content">/g' src/components/Screen2Numbers.tsx
sed -i 's/<div className="screen-hero-text">/<div>/g' src/components/Screen2Numbers.tsx
sed -i 's/<h1>Кілька цифр<\/h1>/<h1 className="screen-hero-title">Кілька цифр<\/h1>/g' src/components/Screen2Numbers.tsx
sed -i 's/<p>Використовуємо для/<p className="screen-sub-title" style={{ marginTop: "4px" }}>Використовуємо для/g' src/components/Screen2Numbers.tsx
