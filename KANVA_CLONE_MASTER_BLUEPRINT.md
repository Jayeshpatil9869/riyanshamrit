# RIYANSH AMRIT — KANVA BOTANICAL LUXURY MASTER BLUEPRINT
**Awwwards-Caliber D2C E-Commerce & Ayurvedic Wellness Experience Architecture**

---

## 1. EXECUTIVE VISION & BRAND DNA

**Riyansh Amrit** is a single-brand luxury Ayurvedic wellness & longevity commerce storefront crafted in the revered **Kanva Botanical Luxury** design paradigm. It bridges ancient 5,000-year Vedic herbal intelligence with modern clinical precision, micro-extracted bio-availability, and award-winning editorial web design.

### Architectural Benchmarks & Influences:
* **Kanva Luxury System**: Natural earth tone palette, generous editorial whitespace, bespoke serif typography, tactile physical interaction metaphors.
* **Motion Primitives (`motion-primitives.com`)**: Micro-interaction springs, layout-morphing tabs, animated counter tickers, staggered blur reveals.
* **Magic UI (`magicui.design`)**: Shimmer buttons, border-beam laser perimeters, dot & retro grids, animated marquee ribbons.
* **Aceternity UI (`ui.aceternity.com`)**: Dynamic spotlight cursor followers, 3D card tilt perspective, tracing beams, aura backgrounds.
* **Skiper UI & 21st.dev (`skiper-ui.com`, `21st.dev`)**: Interactive Dosha quiz engine, botanical microscope ingredient explorer, floating pill action docks.
* **Haikei (`app.haikei.app`)**: Layered organic SVG contours, flowing wave dividers, natural botanical fluid meshes.
* **Realtime Colors (`realtimecolors.com`)**: Curated luxury organic palette tokens ensuring WCAG AAA accessibility across light canvas and dark olive containers.
* **Lenis Smooth Scroll (`lenis.dev`)**: Inertial buttery smooth page translation with velocity preservation.

---

## 2. COMPREHENSIVE UI LIBRARY & COMPONENT CATALOG

| Component Primitive | Origin / Inspiration | Purpose & User Experience |
| :--- | :--- | :--- |
| **`BorderBeam`** | Magic UI | Emits an infinite laser glow running along the border of featured botanical cards and limited harvest badges. |
| **`SpotlightCard`** | Aceternity UI | Captures pointer movement to cast a radial luminous aura and subtle 3D tilt perspective. |
| **`ShimmerButton`** | Magic UI | High-conversion CTA with continuous metallic gold & emerald shimmer sweep. |
| **`NumberTicker`** | Motion Primitives | Smooth spring-eased counting animation for clinical purity percentages and patron numbers. |
| **`TextMorph / WordRotate`** | Motion Primitives | Seamlessly transitions key brand virtues ("Pure", "Potent", "Vedic", "Standardized"). |
| **`TracingBeam`** | Aceternity UI | Vertical glowing path that traces down user scroll on editorial story and clinical trial sections. |
| **`InteractiveDoshaQuiz`** | 21st.dev / Skiper UI | 3-step personalized Ayurvedic constitution diagnostic (Vata, Pitta, Kapha) delivering tailored regimens. |
| **`BotanicalHerbExplorer`** | React Bits / Aceternity | Interactive ingredient modal showcasing HPLC standardized bio-actives (Withanolides, Curcuminoids, Fulvic Acid). |
| **`HaikeiBackground`** | Haikei App | Organic SVG vector contours, layered botanical wave masks, and subtle noise grain overlays. |
| **`SmoothScroll`** | Lenis Scroll | Ultra-fluid inertia scrolling engine configured for responsive touch & mousewheel interactions. |

---

## 3. COLOR PALETTE & DESIGN TOKENS (REALTIME COLORS)

```css
/* Canvas Surfaces */
--token-bg-canvas: #f2f2ef;             /* Raw organic linen canvas */
--token-bg-surface-white: #ffffff;      /* Pure white elevation cards */
--token-bg-surface-subtle: #e8e8e1;     /* Soft bone secondary surface */
--token-bg-surface-sand: #dac5a7;       /* Warm editorial sand container */
--token-bg-surface-olive: #2b3323;      /* Deep Himalayan botanical olive */
--token-bg-surface-dark: #191c18;       /* Obsidian luxury foundation */

/* Typography & Foregrounds */
--token-text-primary: #1a1c18;          /* High-contrast charcoal */
--token-text-secondary: rgba(26,28,24,0.65); /* Editorial paragraph copy */
--token-text-muted: rgba(26,28,24,0.40);     /* Captions & metadata */
--token-text-inverse: #ffffff;          /* Crisp white on olive/dark */
--token-accent-sand: #dac5a7;           /* Sand gold accent */
--token-accent-amber: #d99b26;          /* Golden Turmeric highlight */
--token-accent-terracotta: #a8583b;     /* Earth clay badge */
```

---

## 4. COMPLETE ROUTING & PAGE SPECIFICATIONS

```
/                         -> Home Page (Hero, Value Pillars, Marquee, Products, Dosha Quiz, Editorial Story, Reviews)
/store                    -> Full Botanical Catalog (Category filter, price sort, quick view, badge indicators)
/product/:handle          -> Product Detail Page (3D image gallery, formulation breakdown, dosha balance, herb explorer)
/about                    -> Brand Story, Vedic Heritage, Lunar Harvesting & Clinical Extraction Lab
/contact                  -> Ayurvedic Consultation Form, Wholesale Inquiries & Direct Clinic Concierge
/cart                     -> Full Cart Overview, Free Shipping Progress Bar, Quantity Modifiers, Promo Code
/wishlist                 -> Saved Botanical Formulations & Quick Move-to-Cart
/checkout                 -> Multi-step Customer Details, Shipping Method, Live Order Summary
/checkout/payment         -> Secure Payment Gateway (UPI, Credit Card, NetBanking, COD)
/orders/success           -> Order Confirmation with Confetti Cannon, Tracking Number & Regimen Guide
/account/orders           -> Customer Order History, Live Delivery Status & Re-order Triggers
/shipping                 -> Transparent Cold-Chain & Eco-Friendly Packaging Policy
/cancellation-refund      -> 30-Day Potency Guarantee & Return Terms
/privacy                  -> Data Protection & Ayurvedic Health Profile Privacy
/terms                    -> Terms of Service & Certified Manufacturing Disclosures
```

---

## 5. REVENUE & CONVERSION FUNNEL OPTIMIZATION

1. **Interactive Dosha Diagnostic**: Personalized self-discovery flow that quadruples basket size by bundling synergistic herbs.
2. **Sticky Cart Drawer**: Dynamic progress indicator showing remaining amount needed for Free Expedited Cold-Chain Shipping.
3. **Multi-Currency Engine**: Real-time currency selector (INR, USD, EUR, GBP, AED, CAD, SGD) with automatic conversion.
4. **Celebratory Micro-Moments**: Canvas Confetti bursts upon order placement and quiz completion.
5. **Vedic Trust Badges**: GMP Certified, Ayush Ministry Approved, 3rd-Party Heavy-Metal Tested, 100% Organic Sourcing.
