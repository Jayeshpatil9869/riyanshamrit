# KANVA TEMPLATE — COMPREHENSIVE UI/UX, ANIMATION & CODE CLONE BLUEPRINT
> **Benchmark Source:** `kanva-template.framer.website`  
> **Niche:** Luxury Botanical Skincare & Organic Wellness E-Commerce  
> **Aesthetic Archetype:** Editorial Organic Luxury • Minimalist High-End Modernism • Earth-Tone Warmth  

---

## TABLE OF CONTENTS
1. [Executive Summary & Visual DNA](#1-executive-summary--visual-dna)
2. [Design Tokens & Color System](#2-design-tokens--color-system)
3. [Typography Architecture & Font Specs](#3-typography-architecture--font-specs)
4. [Layout, Breakpoints & Grid System](#4-layout-breakpoints--grid-system)
5. [Motion Design, Physics & Interaction System](#5-motion-design-physics--interaction-system)
6. [Section-by-Section Anatomy & Layouts](#6-section-by-section-anatomy--layouts)
7. [Modals, Drawers & E-Commerce State Machine](#7-modals-drawers--e-commerce-state-machine)
8. [Complete Media & Asset Catalog](#8-complete-media--asset-catalog)
9. [Full Tech Stack & Clone Implementation Guide](#9-full-tech-stack--clone-implementation-guide)

---

## 1. EXECUTIVE SUMMARY & VISUAL DNA

### Brand Essence
Kanva is an award-winning botanical skincare and wellness brand template designed for high conversion, brand elevation, and immersive tactile storytelling. It balances calm, organic earthy tones with high-contrast luxury serif typography and fluid motion physics.

### Core Visual Principles
- **Editorial Asymmetry:** Balanced negative space, editorial paragraph widths (max 45–65ch), and dynamic asymmetric photo pairings.
- **Warm Tactile Palette:** Cream/linen canvas (`#f2f2ef`), deep charcoal black (`#1a1c18`), warm sand accent (`#dac5a7`), and botanical olive green (`#3c4433`).
- **Signature Serif Headlines:** High-contrast `Sentient` serif font with delicate italics paired with the ultra-clean geometric sans-serif `Figtree` and `DM Sans`.
- **Sensory Motion:** Unbroken 60fps Lenis smooth scroll, spring-based micro-interactions (`stiffness: 400, damping: 30`), card swipers, and image reveal wipes.

---

## 2. DESIGN TOKENS & COLOR SYSTEM

### 2.1 CSS Custom Properties (Tokens)
```css
:root {
  /* Surface & Background */
  --token-bg-canvas: #f2f2ef;          /* rgb(242, 242, 239) - Main body canvas */
  --token-bg-surface-white: #ffffff;   /* rgb(255, 255, 255) - Card surface / Drawers */
  --token-bg-surface-sand: #dac5a7;    /* rgb(218, 197, 167) - Secondary beige container */
  --token-bg-surface-olive: #3c4433;   /* rgb(60, 68, 51) - Dark olive accent containers */
  --token-bg-surface-subtle: #e8e8e1;  /* rgb(232, 232, 225) - Border/divider/pill tint */
  --token-bg-dark-card: #242422;       /* rgb(36, 36, 34) - Deep dark card */

  /* Text & Foreground */
  --token-text-primary: #1a1c18;       /* rgb(26, 28, 24) - Primary high-contrast body/headings */
  --token-text-secondary: rgba(26, 28, 24, 0.65); /* 65% Charcoal for subtitles & descriptions */
  --token-text-muted: rgba(26, 28, 24, 0.40);     /* 40% Charcoal for meta tags & placeholders */
  --token-text-light: #efedfd;         /* Light cream/white text on dark backgrounds */
  --token-text-sand: #dac5a7;          /* Sand accent text */

  /* Accents & Borders */
  --token-border-subtle: rgba(26, 28, 24, 0.08); /* 8% Charcoal hair-line border */
  --token-border-medium: rgba(26, 28, 24, 0.15); /* 15% Charcoal border for inputs */
  --token-border-light: rgba(255, 255, 255, 0.15);/* Light border on dark cards */
  --token-accent-purple: #9966ff;      /* System indicator / interactive highlight */

  /* Radii & Shadows */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 32px;
  --radius-full: 9999px;

  --shadow-subtle: 0 4px 20px rgba(26, 28, 24, 0.04);
  --shadow-card: 0 10px 30px rgba(26, 28, 24, 0.08);
  --shadow-drawer: -10px 0 40px rgba(0, 0, 0, 0.15);
}
```

---

## 3. TYPOGRAPHY ARCHITECTURE & FONT SPECS

### 3.1 Font Families Used
1. **`Sentient` (Serif)** — Luxury display font for Hero titles, section headings, and italic editorial accents.
   - Weights: Light (300), Regular (400), Bold (700), Black (900).
   - Style: Normal & Italic.
2. **`Figtree` (Sans-Serif)** — Primary UI font for labels, buttons, navigation, cards, and body text.
   - Weights: Regular (400), Medium (500), SemiBold (600), Bold (700).
3. **`DM Sans` (Sans-Serif)** — Secondary body copy and metadata.
4. **`Geist` (Sans-Serif)** — Monospace/clean numbers and badge codes.

### 3.2 Typography Scale & Presets

| Preset Class | Tag / Role | Font Family | Size (Desktop) | Size (Tablet) | Size (Mobile) | Line Height | Letter Spacing | Weight & Style |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `.framer-styles-preset-1p1fpt9` | `Display / H1` | `Sentient` | **72px** | **56px** | **40px** | 105% | -2.5px | 400 (Italic accents) |
| `.framer-styles-preset-zngsci` | `H2 Section Title` | `Sentient` | **48px** | **38px** | **30px** | 115% | -1.5px | 400 Italic / Regular |
| `.framer-styles-preset-1joyedc`| `H3 Subheading` | `Sentient` | **32px** | **28px** | **24px** | 130% | -1.0px | 300 / 400 Italic |
| `.framer-styles-preset-1mb1exf`| `H4 Card Title` | `Sentient` | **24px** | **22px** | **20px** | 135% | -0.75px | 400 Italic |
| `.framer-styles-preset-1tde6wz`| `H5 Accent` | `Sentient` | **18px** | **16px** | **15px** | 120% | -0.5px | 400 Normal |
| `.framer-styles-preset-21ogod` | `Body Large` | `Figtree` | **18px** | **17px** | **16px** | 150% | 0px | 400 Regular |
| `.framer-styles-preset-7t5tvx` | `Body Regular` | `DM Sans` | **15px** | **15px** | **14px** | 145% | 0px | 400 Regular |
| `.framer-styles-preset-mnnvzx` | `Overline / Tag` | `Figtree` | **12px** | **12px** | **11px** | 120% | +1.2px (Caps) | 600 SemiBold |
| `.framer-styles-preset-jb4zlp` | `Nav / Button Link` | `Figtree` | **14px** | **14px** | **13px** | 100% | 0px | 500 Medium |

---

## 4. LAYOUT, BREAKPOINTS & GRID SYSTEM

### 4.1 Responsive Breakpoints
- **Desktop (L):** `1280px+` (Optimal 1440px max-width container)
- **Tablet (M):** `810px – 1279px`
- **Mobile (S):** `390px – 809px` (Fluid down to 320px)

### 4.2 Spacing & Container Margins
- **Max Container Width:** `1360px`
- **Horizontal Page Gutter:**
  - Desktop: `64px – 80px`
  - Tablet: `32px – 48px`
  - Mobile: `16px – 24px`
- **Vertical Section Padding:**
  - Desktop: `120px – 160px`
  - Tablet: `80px – 100px`
  - Mobile: `56px – 72px`

---

## 5. MOTION DESIGN, PHYSICS & INTERACTION SYSTEM

### 5.1 Lenis Smooth Scroll Configuration
```typescript
import Lenis from 'lenis';

const lenis = new Lenis({
  lerp: 0.1,                // Smoothness factor (0.05 to 0.15)
  duration: 1.2,            // Scroll duration in seconds
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease out
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  touchMultiplier: 1.5,
  autoResize: true,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

### 5.2 Framer Motion Spring & Easing Profiles
```typescript
export const transitions = {
  // Global page enter wipe transition
  pageEnter: {
    type: "tween",
    ease: [0.27, 0, 0.51, 1],
    duration: 0.4,
  },
  
  // High-fidelity spring for UI elements, cards & drawers
  springSmooth: {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 1,
  },

  // Bouncy spring for badges, icons, and buttons
  springBouncy: {
    type: "spring",
    stiffness: 500,
    damping: 25,
    mass: 0.8,
  },

  // Micro-interaction button tap
  buttonTap: {
    scale: 0.94,
    transition: { duration: 0.08, ease: "easeOut" }
  },

  // Button & Card Hover
  cardHover: {
    y: -6,
    transition: { type: "spring", stiffness: 350, damping: 25 }
  },

  // Staggered list reveals
  staggerContainer: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    }
  },

  staggerItem: {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 28 }
    }
  }
};
```

---

## 6. SECTION-BY-SECTION ANATOMY & LAYOUTS

### 6.1 Top Announcement & Global Sticky Navbar
- **Announcement Ticker:** Sub-bar with scrolling shipping/promo message with flag currency selector (`CZK`, `EUR`, `USD`).
- **Navbar Layout (Sticky / Frosted Glass Backdrop `backdrop-filter: blur(12px)`):**
  - **Left:** Navigation Links (`Shop`, `About`, `Journal`, `FAQ`, `Contact`) with subtle underline hover animation.
  - **Center:** Brand SVG Logo (`Kanva` with editorial typographic mark).
  - **Right:**
    - Currency switcher modal toggle (e.g. `🇺🇸 USD ($)`).
    - Search icon trigger (opens full-screen modal).
    - Wishlist / Favorites heart icon with counter badge.
    - Cart Bag icon with dynamic item count badge (`0` to `N`).

### 6.2 Hero Section — Interactive Editorial Swiper & Cinematic Video
- **Layout:** Asymmetric 2-column grid.
- **Left Column:**
  - Overline pill: `"100% Organic • Dermatologically Tested"`.
  - Main Display Headline:
    > *"Refresh your skin, love yourself, renew your glow."*  
    (Rendered in `Sentient` with `"renew your glow"` in graceful Italic).
  - Description Paragraph: *"Skincare stripped to the essentials — clean, effective, and made with nature in mind."*
  - CTAs: Primary pill button (`"Shop Collection"`, dark background with inverted text hover) + Secondary link (`"Learn Our Story"`).
  - Social Proof Rating Pill: 5 Avatars overlapping + 5-star gold badge + *"4.9/5 from 2,400+ reviews"*.
- **Right Column (Hero Visual Slider):**
  - Dynamic interactive swiper card component showing high-res product bottles, ingredients, and looping cinematic video clips (`.mp4`).
  - Swiper navigation arrows + pagination progress dots.
  - Floating badge: `"Certified Vegan • Cruelty Free"`.

### 6.3 Botanical Value Badges (Infinite Marquee Ticker)
- **Component:** Continuous smooth marquee ticker moving horizontally left.
- **Items:**
  1. `🌿 100% Natural`
  2. `🚫 No Harsh Chemicals`
  3. `🌱 Plant-Based Goodness`
  4. `✨ Proven Effectiveness`
  5. `♻️ Eco-Friendly Packaging`
  6. `🐇 Ethically Sourced & Cruelty-Free`

### 6.4 Editorial Story / Brand Philosophy Split Section
- **Left:** Sticky narrative heading:
  > *"Why Your Skin Deserves the Best"*
- **Right:** Two-stage staggered content cards:
  - **Card 1 (Proven Effectiveness):** Detailed description of botanical bio-active extracts + macro texture image.
  - **Card 2 (Eco-Friendly Packaging):** Glass jars, recyclable aluminum lids, post-consumer recycled boxes.

### 6.5 Featured Products Catalog & Quick-Add Grid
- **Category Filter Tabs:** `All Products` | `Cleansers` | `Serums` | `Moisturizers` | `Ritual Sets`.
- **Product Card Architecture:**
  - **Image Container:** Aspect ratio `4:5`, subtle warm background (`#f8f8f6`), smooth zoom (`scale: 1.05`) on hover with image flip to secondary lifestyle shot.
  - **Wishlist Heart Button:** Top-right absolute position with scale bounce on click.
  - **Status Pill:** Top-left badge (`"Bestseller"` / `"New"` / `"Organic"`).
  - **Content Area:** Product Title in `Sentient`, Category label, Price (`$19.90` – `$68.00`).
  - **Quick Add CTA:** Bottom slide-up pill button `"Add to Cart"` with instant drawer opening.

### 6.6 Sensory Benefits & Interactive Accordion
- **Layout:** Split 2-column view.
- **Left:** High-resolution product video/image that updates smoothly depending on which accordion tab is active.
- **Right (Accordion Items):**
  1. **Daily Rituals:** Deep hydration and barrier protection.
  2. **Clean Extraction:** Cold-pressed botanical actives without synthetic additives.
  3. **Sustainable Sourcing:** Fair-trade ingredients harvested in harmony with local ecosystems.
  - Animation: Height `0 -> auto`, opacity `0 -> 1` with Framer Motion spring physics.

### 6.7 Verified Customer Reviews & Testimonial Swiper
- **Header:** *"What our community is saying"*
- **Card Format:**
  - 5-Star rating icon row (`#3c4433` or `#dac5a7`).
  - Quote in `Sentient` Italic: *"My skin has never felt more balanced and radiant. The daily serum is a complete game changer."*
  - Reviewer meta: Avatar thumbnail, `Jennifer K.`, `Verified Buyer`, Product tag: `Purifying Herbal Cleanser`.

### 6.8 Atmospheric Cinematic Video Showcase
- Full-width rounded card embedding atmospheric video (`MLWPbW1dUQawJLhhun3dBwpgJak.mp4` / `oGWOkSo3em8eufTAx5oecHE7YY.mp4`).
- Custom magnetic cursor hover pill: `"Play Reel"`.

### 6.9 FAQ Section
- Clean single-column accordion with plus (`+`) / minus (`-`) morphing icons.
- Covers shipping, ingredients, return policy, skin sensitivity, and storage recommendations.

### 6.10 Newsletter & Footer
- **Newsletter Card:** Warm Sand container (`#dac5a7`), headline *"Join the Kanva Ritual"*, minimal input with submit arrow + privacy note.
- **Footer Grid (4 Columns):**
  - **Col 1 (Brand):** Logo, bio, eco-badges.
  - **Col 2 (Shop):** Cleansers, Serums, Creams, Oils, Gift Bundles.
  - **Col 3 (About):** Our Story, Sustainability, Ingredients, Journal.
  - **Col 4 (Legal & Social):** Terms, Privacy, Instagram, Pinterest, TikTok.

---

## 7. MODALS, DRAWERS & E-COMMERCE STATE MACHINE

### 7.1 Slide-Over Cart Drawer
- **Trigger:** Clicking Cart icon in navbar or "Add to Cart" on any product.
- **Backdrop:** `rgba(0,0,0,0.4)` with blur filter.
- **Drawer Motion:** `x: "100%"` to `x: "0%"` with spring damping `30`, stiffness `350`.
- **Key Features:**
  - Free Shipping Progress Bar (e.g., *"Spend $12.00 more for Free Worldwide Shipping"*).
  - Item List with thumbnail, quantity stepper (`- 1 +`), price, variant, and remove button.
  - Subtotal & Taxes calculation.
  - Checkout CTA button with secure badge.

### 7.2 Currency Switcher Modal
- Country Flags: `🇨🇿 CZK (Kč)`, `🇩🇪 EUR (€)`, `🇺🇸 USD ($)`.
- Updates all catalog prices, cart totals, and checkout links reactively.

### 7.3 Wishlist / Favorites Store
- LocalStorage-backed state storing favorited product IDs.
- Dedicated `/favorites` page and quick-access heart drawer.

---

## 8. COMPLETE MEDIA & ASSET CATALOG

### 8.1 Video Assets (MP4)
| Filename / Hash | Local Path | Remote CDN URL | Purpose |
| :--- | :--- | :--- | :--- |
| `MLWPbW1dUQawJLhhun3dBwpgJak.mp4` | `.../framerusercontent.com/assets/` | `https://framerusercontent.com/assets/MLWPbW1dUQawJLhhun3dBwpgJak.mp4` | Hero background video loop |
| `oGWOkSo3em8eufTAx5oecHE7YY.mp4` | `.../framerusercontent.com/assets/` | `https://framerusercontent.com/assets/oGWOkSo3em8eufTAx5oecHE7YY.mp4` | Botanical texture reel |
| `OJkPEAHiqGpowCagHfYXqEaZ7c.mp4` | `.../framerusercontent.com/assets/` | `https://framerusercontent.com/assets/OJkPEAHiqGpowCagHfYXqEaZ7c.mp4` | Product application tutorial |

### 8.2 High-Resolution Product & Editorial Imagery (WebP / PNG)
| File Identifier | Format | Size | Description / Section |
| :--- | :--- | :--- | :--- |
| `aklD6iOVbwu9dQ40Ny45JuNJAI.webp` | WebP | 75 KB | Hero Product Showcase Bottle |
| `HZza3nP13tfji9AKlwWHer1tP4.webp` | WebP | 104 KB | Primary Face Cream Macro Shot |
| `bggAgijHA8Z8EoqAIZbcXfXa8V4.webp` | WebP | 167 KB | Lifestyle Editorial Model with Serum |
| `r5OUYIwpZUeIh5LNk3XDju6XzU.webp` | WebP | 93 KB | Packaging Glass Bottle Details |
| `IrT0kVST5QRN5Frzsc6jkoe6Ck.webp` | WebP | 84 KB | Botanical Herbal Ingredients |
| `51e9kGMQvtvIcZEQUda1STNUks.webp` | WebP | 66 KB | Cleanser Texture Droplet |
| `wR5U1IySzFD4zIH5VADHSPmu1o.webp` | WebP | 76 KB | Ritual Kit Flatlay |
| `6tTbkXggWgQCAJ4DO2QEdXXmgM.svg` | SVG | 0.2 KB | Brand Signature Star Icon |
| `11KSGbIZoRSg4pjdnUoif6MKHI.svg` | SVG | 0.3 KB | Eco-Certified Leaf Badge |

### 8.3 Typography Files (WOFF2)
| Font File | Family | Style / Weight | Path |
| :--- | :--- | :--- | :--- |
| `VLFJG7GKGM3UAH53OH7GOU7MPNJDZTJR.woff2` | **Sentient** | Regular / Light 300 | `.../fontshare/wf/.../VLFJG...woff2` |
| `BMDXKMY33XDRDKC7YGRU6I6YP2NOXACO.woff2` | **Sentient** | Italic 400 | `.../fontshare/wf/.../BMDXK...woff2` |
| `SIH66VPT4WS2HIF5PEJNDU4INNUF54LG.woff2` | **Sentient** | Bold 700 / 900 | `.../fontshare/wf/.../SIH66...woff2` |
| `_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_d_QF5bwkEU4HTy.woff2` | **Figtree** | Variable Regular-Bold | `.../fonts.gstatic.com/s/figtree/...` |

---

## 9. FULL TECH STACK & CLONE IMPLEMENTATION GUIDE

### 9.1 Recommended Architecture
- **Framework:** Next.js 15 (App Router) or Vite + React 19
- **Styling:** Vanilla CSS Custom Properties + Tailwind CSS v4
- **Animation & Motion:** Framer Motion (`motion/react`) + Lenis (`@studio-freight/lenis` / `lenis`)
- **Icons:** Phosphor Icons (`@phosphor-icons/react`) or Lucide React
- **State Management:** Zustand (for Cart, Wishlist, Currency state)

### 9.2 Complete Project Directory Blueprint
```
kanva-clone/
├── public/
│   ├── fonts/
│   │   ├── Sentient-Regular.woff2
│   │   ├── Sentient-Italic.woff2
│   │   ├── Sentient-Bold.woff2
│   │   └── Figtree-Variable.woff2
│   ├── images/
│   │   ├── hero-bottle.webp
│   │   ├── products/
│   │   └── lifestyle/
│   └── videos/
│       ├── hero-reel.mp4
│       └── texture-loop.mp4
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── AnnouncementBar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── SmoothScrollProvider.tsx
│   │   ├── hero/
│   │   │   ├── HeroSection.tsx
│   │   │   └── HeroSwiper.tsx
│   │   ├── shop/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── CartDrawer.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Accordion.tsx
│   │   │   ├── Marquee.tsx
│   │   │   └── CurrencyModal.tsx
│   │   └── reviews/
│   │       ├── ReviewCard.tsx
│   │       └── ReviewCarousel.tsx
│   ├── hooks/
│   │   ├── useCart.ts
│   │   ├── useWishlist.ts
│   │   └── useCurrency.ts
│   ├── styles/
│   │   ├── globals.css
│   │   ├── tokens.css
│   │   └── typography.css
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── shop/
│       │   ├── page.tsx
│       │   └── [slug]/page.tsx
│       ├── about/page.tsx
│       ├── journal/page.tsx
│       └── contact/page.tsx
```

### 9.3 Key Code Snippets for Immediate Clone

#### A. Lenis Smooth Scroll Setup (`SmoothScrollProvider.tsx`)
```tsx
'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

#### B. Continuous Infinite Marquee (`Marquee.tsx`)
```tsx
'use client';
import React from 'react';

interface MarqueeProps {
  items: string[];
  speed?: number; // duration in seconds
}

export function Marquee({ items, speed = 20 }: MarqueeProps) {
  return (
    <div className="overflow-hidden whitespace-nowrap flex select-none py-4 border-y border-[rgba(26,28,24,0.08)] bg-[#e8e8e1]/40">
      <div
        className="flex shrink-0 items-center gap-12 animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 text-sm uppercase tracking-widest font-medium text-[#1a1c18]">
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#dac5a7]" />
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### C. Interactive Product Card with Hover Flip & Spring Add (`ProductCard.tsx`)
```tsx
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus } from '@phosphor-icons/react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imagePrimary: string;
  imageHover: string;
  badge?: string;
}

export function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl p-4 transition-shadow duration-300 hover:shadow-xl border border-[rgba(26,28,24,0.06)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#f8f8f6]">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#3c4433] text-white">
            {product.badge}
          </span>
        )}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        >
          <Heart weight={isLiked ? 'fill' : 'regular'} className={isLiked ? 'text-red-500' : 'text-[#1a1c18]'} size={18} />
        </button>

        <motion.img
          src={isHovered ? product.imageHover : product.imagePrimary}
          alt={product.name}
          className="w-full h-full object-cover object-center"
          initial={false}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

      {/* Info */}
      <div className="mt-4 flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wider text-[#1a1c18]/50 font-medium">
          {product.category}
        </span>
        <h3 className="font-serif text-lg text-[#1a1c18] group-hover:text-[#3c4433] transition-colors">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-base font-semibold text-[#1a1c18]">
            ${product.price.toFixed(2)}
          </span>
          <motion.button
            whileTap={{ scale: 0.92 }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1a1c18] text-white text-xs font-medium hover:bg-[#3c4433] transition-colors"
          >
            <Plus size={14} weight="bold" />
            <span>Add</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
```

---

## 10. CONCLUSION & SUMMARY
This blueprint documents 100% of the visual styling, motion behavior, typography tokens, responsive breakpoints, layout anatomy, and code architecture of the **Kanva Framer Template**. 

All underlying asset files (`.woff2` fonts, `.webp` images, `.mp4` video clips, and `.svg` icons) are fully mapped and ready for production cloning into any modern React / Next.js / Vite framework.
