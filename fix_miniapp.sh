#!/bin/bash
sed -i 's/borderRadius: `${40 \* scale}px`,//g' src/components/landing/HowItWorksSection.tsx
sed -i 's/boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2)",//g' src/components/landing/HowItWorksSection.tsx
sed -i 's/backgroundColor: "#12100E",//g' src/components/landing/HowItWorksSection.tsx
