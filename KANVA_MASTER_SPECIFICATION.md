# RIYANSH AMRIT — KANVA MASTER SPECIFICATION
**Complete Design System, Component Contracts, Animation Timings & Interaction Rules**

---

## 1. TYPOGRAPHY HIERARCHY & FLUID SCALES

```css
/* Display & Serif Typography */
--font-serif: 'Cormorant Garamond', 'Sentient', 'Playfair Display', Georgia, serif;
--font-sans: 'Figtree', 'Plus Jakarta Sans', -apple-system, sans-serif;
--font-body: 'DM Sans', 'Inter', sans-serif;
--font-mono: 'Space Mono', 'Geist Mono', monospace;

/* Responsive Fluid Typescale */
--font-size-display-h1: clamp(2.5rem, 5.5vw, 4.5rem);  /* 40px -> 72px */
--font-size-h2: clamp(1.875rem, 3.8vw, 3rem);          /* 30px -> 48px */
--font-size-h3: clamp(1.5rem, 2.5vw, 2rem);             /* 24px -> 32px */
--font-size-h4: clamp(1.25rem, 1.8vw, 1.5rem);          /* 20px -> 24px */
--font-size-body-lg: 1.125rem;                          /* 18px */
--font-size-body-md: 0.9375rem;                         /* 15px */
--font-size-body-sm: 0.8125rem;                         /* 13px */
--font-size-overline: 0.6875rem;                        /* 11px */

/* Line Heights */
--font-line-height-tight: 1.05;
--font-line-height-heading: 1.15;
--font-line-height-body: 1.55;

/* Letter Spacings */
--letter-spacing-tight: -0.035em;
--letter-spacing-normal: 0em;
--letter-spacing-overline: 0.12em;
```

---

## 2. MOTION & EASING TOKENS (FRAMER MOTION & GSAP)

```typescript
export const MOTION_SPRINGS = {
  snappy: { type: "spring", stiffness: 400, damping: 30 },
  smooth: { type: "spring", stiffness: 200, damping: 25 },
  gentle: { type: "spring", stiffness: 120, damping: 20 },
  bouncy: { type: "spring", stiffness: 500, damping: 15 }
};

export const MOTION_EASINGS = {
  luxuryEase: [0.16, 1, 0.3, 1], // Cubic bezier for silky page reveals
  editorialEase: [0.25, 1, 0.5, 1],
  anticipate: [0.68, -0.6, 0.32, 1.6]
};
```

---

## 3. INTERACTIVE COMPONENT INTERFACES & PROPS

### A. `BorderBeam` (Magic UI)
```typescript
interface BorderBeamProps {
  size?: number;             // Width of beam in px (default: 200)
  duration?: number;         // Speed of cycle in seconds (default: 12)
  delay?: number;            // Delay before starting animation
  colorFrom?: string;        // Starting gradient color (#dac5a7)
  colorTo?: string;          // Ending gradient color (#3c4433)
  borderWidth?: number;      // Stroke thickness (default: 1.5)
  className?: string;
}
```

### B. `SpotlightCard` (Aceternity UI)
```typescript
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;   // Radial glow RGBA color
  spotlightRadius?: number;  // Radius in px (default: 350)
  enableTilt?: boolean;      // 3D perspective tilt on pointermove
}
```

### C. `ShimmerButton` (Magic UI)
```typescript
interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;     // Shimmer band color (#ffffff or #dac5a7)
  shimmerSize?: string;      // Thickness (0.1em)
  borderRadius?: string;     // Border radius ('9999px' or '14px')
  shimmerDuration?: string;  // Duration ('2.5s')
  background?: string;       // Surface background
  children: React.ReactNode;
}
```

### D. `InteractiveDoshaQuiz` (21st.dev / Skiper UI)
* Diagnostics: Energy, Sleep, Digestion, Skin Constitution.
* Scoring: Weighted aggregation for Vata (Wind), Pitta (Fire), Kapha (Earth).
* Outcome: Custom herbal regimen + direct "Add Recommended Regimen to Cart" action.

---

## 4. AWWWARDS CRITERIA COMPLIANCE CHECKLIST

- [x] **Art Direction & Taste**: Custom earthy tone system, editorial serif typography, no generic AI gradients.
- [x] **Fluid Motion**: Lenis smooth scroll + Framer Motion staggered reveals with full `prefers-reduced-motion` compliance.
- [x] **Micro-Interactions**: Magnetic hover buttons, subtle border beam glows, 3D card tilt physics, animated counter numbers.
- [x] **E-Commerce Completeness**: Multi-currency, promo codes, cart drawers, quick view modal, multi-step checkout, confetti success.
- [x] **Responsive Craftsmanship**: Fluid typography clamp values, bespoke mobile drawer layouts, touch-optimized swipe targets.
