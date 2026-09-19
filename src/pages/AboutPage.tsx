import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Leaf, Sparkles, Check, Heart, ShieldCheck, Truck, ArrowDown } from 'lucide-react';

// --- ANIMATED NUMBER COUNTER ---
function AnimatedCounter({
  end,
  suffix = '',
  duration = 1.4
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Exponential ease-out
      const easeOut = 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span
      ref={ref}
      className="font-serif italic font-light text-4xl sm:text-5xl text-[#1a1c18] tracking-tight"
    >
      {count}
      {suffix}
    </span>
  );
}

// --- BLUR REVEAL WRAPPER ---
const blurReveal = {
  hidden: { opacity: 0.001, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 350, damping: 30, mass: 1 }
  }
};

export const AboutPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const scrollToStats = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('about-stats');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#f2f2ef] text-[#1a1c18] overflow-x-hidden font-sans">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                          */}
      {/* ========================================================================= */}
      <section
        ref={heroRef}
        className="relative w-full h-screen min-h-[640px] flex items-end justify-start overflow-hidden pb-16 md:pb-24 px-6 sm:px-12 md:px-20 pt-28"
      >
        {/* Parallax Background Image */}
        <motion.div
          style={{ y: heroImageY }}
          className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
        >
          <img
            src="/assets/images/wR5U1IySzFD4zIH5VADHSPmu1o.webp"
            alt="Riyansh Amrit About Hero"
            className="w-full h-full object-cover object-center"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-black/30 z-[1]" />
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-[2]" />

          {/* Top & Bottom Blur-Wave Mask */}
          <div className="absolute bottom-0 left-0 right-0 h-32 backdrop-blur-md bg-white/5 [mask-image:linear-gradient(0deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)] z-[3]" />
          <div className="absolute top-0 left-0 right-0 h-32 backdrop-blur-md bg-white/5 [mask-image:linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)] z-[3]" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1400px] w-full mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-2xl">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={blurReveal}
              className="text-5xl sm:text-7xl lg:text-8xl font-serif tracking-tight leading-[1.02]"
            >
              <span className="text-white block">Redefining</span>
              <span className="text-white/70 italic font-light block">Skincare</span>
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              variants={blurReveal}
              className="text-white/80 text-base sm:text-lg max-w-xl font-light leading-relaxed"
            >
              At Riyansh Amrit, we blend sacred botanical science and pure nature to create skincare that transforms, empowers, and respects the planet.
            </motion.p>
          </div>

          {/* Pill Button Anchor */}
          <motion.a
            href="#about-stats"
            onClick={scrollToStats}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="self-start md:self-end bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/25 text-white text-sm font-medium px-6 py-3 rounded-full transition-all hover:scale-105 inline-flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Our Story</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </motion.a>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. METRICS & STATS SECTION                                               */}
      {/* ========================================================================= */}
      <section id="about-stats" className="py-20 md:py-28 px-6 sm:px-12 md:px-20 max-w-[1400px] mx-auto scroll-mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Stat Card 1 */}
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center text-center gap-3 shadow-[0_4px_24px_rgba(26,28,24,0.04)] border border-[rgba(26,28,24,0.06)] hover:-translate-y-1 transition-transform duration-300">
            <AnimatedCounter end={100} suffix="%" />
            <h3 className="text-base font-semibold text-[#1a1c18]">Natural Ingredients</h3>
            <p className="text-[13.5px] text-[#1a1c18]/70 leading-relaxed font-normal">Pure, safe, and sustainably sourced botanical skincare.</p>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center text-center gap-3 shadow-[0_4px_24px_rgba(26,28,24,0.04)] border border-[rgba(26,28,24,0.06)] hover:-translate-y-1 transition-transform duration-300">
            <AnimatedCounter end={97} suffix="%" />
            <h3 className="text-base font-semibold text-[#1a1c18]">Customer Satisfaction</h3>
            <p className="text-[13.5px] text-[#1a1c18]/70 leading-relaxed font-normal">Trusted by happy, glowing patrons worldwide.</p>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center text-center gap-3 shadow-[0_4px_24px_rgba(26,28,24,0.04)] border border-[rgba(26,28,24,0.06)] hover:-translate-y-1 transition-transform duration-300">
            <AnimatedCounter end={85} suffix="%" />
            <h3 className="text-base font-semibold text-[#1a1c18]">Less Packaging</h3>
            <p className="text-[13.5px] text-[#1a1c18]/70 leading-relaxed font-normal">Eco-friendly amber glass designs for a greener planet.</p>
          </div>

          {/* Stat Card 4 */}
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center text-center gap-3 shadow-[0_4px_24px_rgba(26,28,24,0.04)] border border-[rgba(26,28,24,0.06)] hover:-translate-y-1 transition-transform duration-300">
            <AnimatedCounter end={9} suffix="/10" />
            <h3 className="text-base font-semibold text-[#1a1c18]">Recommend Us</h3>
            <p className="text-[13.5px] text-[#1a1c18]/70 leading-relaxed font-normal">Loved and recommended by clinical dermatologists.</p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. EDITORIAL STORY & BENEFITS (Z-PATTERN)                                 */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 px-6 sm:px-12 md:px-20 max-w-[1400px] mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* Section Header with Reviews Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[rgba(26,28,24,0.1)] pb-10">
          <div>
            <h2 className="text-4xl sm:text-5xl font-serif text-[#1a1c18] leading-tight">
              Driven by Care
            </h2>
            <h2 className="text-4xl sm:text-5xl font-serif italic font-light text-[#1a1c18]/60">
              Rooted in Nature
            </h2>
          </div>

          {/* Social Proof Avatars Badge */}
          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-full shadow-sm border border-[rgba(26,28,24,0.08)] self-start">
            <div className="flex -space-x-2">
              <img
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                src="/assets/images/WM2mkMIFXECzXRvcuyR2t35jE.webp"
                alt="Patron 1"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                src="/assets/images/vAsQUc57V7vQ6L24k7FTe2aAk0g.webp"
                alt="Patron 2"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                src="/assets/images/xdCJPsYAb1YfHzQkXktdaxPWKQ.webp"
                alt="Patron 3"
              />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1a1c18]">
              <span className="text-[#1a1c18] tracking-tighter">★★★★★</span>
              <span>4.9 (2,400+ reviews)</span>
            </div>
          </div>
        </div>

        {/* Story Block 1: Left Image + Right Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="h-[420px] sm:h-[480px] lg:h-[600px] rounded-3xl overflow-hidden shadow-sm bg-[#e8e8e1]">
            <img
              src="/assets/images/r5OUYIwpZUeIh5LNk3XDju6XzU.webp"
              alt="Our Botanical Journey"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col gap-8 shadow-sm border border-[rgba(26,28,24,0.06)]">
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest text-[#757d5c] font-bold font-mono">Our Journey</span>
              <h3 className="text-3xl sm:text-4xl font-serif text-[#1a1c18] leading-snug">
                Why Your Skin <span className="italic font-light text-[#1a1c18]/60">Deserves the Best</span>
              </h3>
              <p className="text-[#1a1c18]/70 text-[15px] sm:text-base leading-relaxed mt-2 font-normal">
                Riyansh Amrit started with a simple belief: skincare must work in harmony with your skin and the natural rhythm of the Earth. From our humble botanical sanctuary to a revered Ayurvedic apothecary, we have stayed dedicated to delivering non-toxic, potent, and regenerative formulas.
              </p>
            </div>

            <ul className="flex flex-col gap-3.5 pt-4 border-t border-[rgba(26,28,24,0.08)] text-[#1a1c18]/85 text-sm font-medium">
              <li className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#f2f2ef] flex items-center justify-center text-xs">🌿</span>
                Founded on Sustainability
              </li>
              <li className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#f2f2ef] flex items-center justify-center text-xs">🌱</span>
                Powered by Cold-Pressed Natural Actives
              </li>
              <li className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#f2f2ef] flex items-center justify-center text-xs">✨</span>
                Driven by Ayurvedic Innovation
              </li>
            </ul>
          </div>
        </div>

        {/* Story Block 2: Left Card + Right Image (Inverted) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1 bg-white rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col gap-8 shadow-sm border border-[rgba(26,28,24,0.06)]">
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest text-[#757d5c] font-bold font-mono">About Us</span>
              <h3 className="text-3xl sm:text-4xl font-serif text-[#1a1c18] leading-snug">
                Simple Rituals <span className="italic font-light text-[#1a1c18]/60">Powerful Results</span>
              </h3>
              <p className="text-[#1a1c18]/70 text-[15px] sm:text-base leading-relaxed mt-2 font-normal">
                True radiance is an effortless ritual. By fusing ancient Ayurvedic herbs with modern clean extraction, we deliver transformative skincare that nourishes your barrier without irritating chemicals.
              </p>
            </div>

            <ul className="flex flex-col gap-3.5 pt-4 border-t border-[rgba(26,28,24,0.08)] text-[#1a1c18]/85 text-sm font-medium">
              <li className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#f2f2ef] flex items-center justify-center text-xs">🌿</span>
                100% Natural Active Ingredients
              </li>
              <li className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#f2f2ef] flex items-center justify-center text-xs">♻️</span>
                Zero-Waste Amber Glass Packaging
              </li>
              <li className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#f2f2ef] flex items-center justify-center text-xs">🐇</span>
                Strict Cruelty-Free Guarantee
              </li>
            </ul>
          </div>

          <div className="order-1 lg:order-2 h-[420px] sm:h-[480px] lg:h-[600px] rounded-3xl overflow-hidden shadow-sm bg-[#e8e8e1]">
            <img
              src="/assets/images/aklD6iOVbwu9dQ40Ny45JuNJAI.webp"
              alt="Simple Rituals Skincare"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. EDITORIAL QUOTE & MANIFESTO                                           */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-32 px-6 text-center max-w-4xl mx-auto flex flex-col items-center gap-8">
        
        {/* Overlapping Card Fan-Out Illustration */}
        <div className="relative w-20 h-20 mb-2">
          <div className="absolute inset-0 bg-white shadow-md rounded-xl transform -rotate-8 border border-black/5 overflow-hidden p-1">
            <img
              src="/assets/images/WCTyNPKBDXsCpbWjuDNL9u64Im0.webp"
              alt="Card Fan 1"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="absolute inset-0 bg-white shadow-xl rounded-xl transform rotate-6 border border-black/5 overflow-hidden p-1">
            <img
              src="/assets/images/CF2N0dpJPPAkAhLMWmcwJ1379WQ.webp"
              alt="Card Fan 2"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#1a1c18] leading-[1.25] tracking-tight">
          Natural Beauty. <br />
          <span className="italic font-light text-[#1a1c18]/60">Sustainable Future.</span> <br />
          <span className="inline-flex items-center gap-3">
            Effective Skincare.
            <img
              src="/assets/images/FFCrEktTnhhh1b6RPbayPiY.png"
              alt="Leaf Stamp"
              className="w-14 sm:w-18 inline-block object-contain drop-shadow-sm -mt-1"
            />
          </span>
        </h2>

        <div className="flex flex-col items-center gap-1 mt-3">
          <span className="text-sm font-semibold tracking-wider uppercase text-[#1a1c18]">Our Mission</span>
          <span className="text-xs font-mono text-[#1a1c18]/60 tracking-wider">Riyansh Amrit Botanical Labs</span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. LARGE DARK SUSTAINABILITY BANNER                                      */}
      {/* ========================================================================= */}
      <section className="py-8 px-4 sm:px-8 max-w-[1600px] mx-auto">
        <div className="relative rounded-[32px] overflow-hidden bg-[#182015] text-white p-10 sm:p-16 lg:p-24 min-h-[520px] sm:min-h-[580px] flex flex-col justify-between border border-white/10 shadow-2xl">
          
          <img
            src="/assets/images/51e9kGMQvtvIcZEQUda1STNUks.webp"
            alt="Sustainability Botanical Leaf"
            className="absolute inset-0 w-full h-full object-cover object-right opacity-60 z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-[1]" />

          <div className="relative z-10 max-w-xl flex flex-col gap-6">
            <h2 className="text-4xl sm:text-6xl font-serif leading-tight">
              Sustainability <br />
              <span className="italic font-light text-white/70">& Quality</span>
            </h2>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed font-light">
              Every formulation is created with 100% natural, ethically gathered Ayurvedic actives to ensure safe, restorative, and pure vitality for your complexion.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-4 sm:gap-8 mt-12 pt-8 border-t border-white/15">
            <div className="flex items-center gap-2.5 text-sm font-medium text-white/95">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">🌿</span>
              Clean Ingredients
            </div>
            <div className="flex items-center gap-2.5 text-sm font-medium text-white/95">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">🌱</span>
              Nature-Driven Solutions
            </div>
            <div className="flex items-center gap-2.5 text-sm font-medium text-white/95">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">✨</span>
              Conscious Choices
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. ECO-PACKAGING & 4-PILLAR GRID                                         */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-32 px-6 sm:px-12 md:px-20 max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Bottle Imagery */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 flex justify-center">
            <div className="w-full max-w-[280px] h-[450px] sm:h-[520px] rounded-3xl overflow-hidden shadow-lg border border-[rgba(26,28,24,0.06)] bg-[#e8e8e1] flex items-center justify-center p-6">
              <img
                src="/assets/images/OuM3OZFPZJTwubdSXl9OM7PsUc.webp"
                alt="Eco Packaging Bottle"
                className="w-full h-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right: Copy & 2x2 Pillar Cards */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl sm:text-5xl font-serif text-[#1a1c18] leading-tight">
                Eco-Friendly <span className="italic font-light text-[#1a1c18]/60">Packaging</span>
              </h2>
              <p className="text-[#1a1c18]/70 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                At Riyansh Amrit, sustainability guides every formulation choice. Our containers are engineered to eliminate plastic pollution and protect our delicate botanicals from UV degradation.
              </p>
            </div>

            {/* 2x2 Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
              
              <div className="bg-white p-7 rounded-2xl border border-[rgba(26,28,24,0.06)] shadow-sm flex flex-col gap-2.5 hover:-translate-y-1 transition-transform duration-300">
                <span className="text-2xl">🌿</span>
                <h3 className="text-base font-semibold text-[#1a1c18]">Natural Formula</h3>
                <p className="text-[13.5px] text-[#1a1c18]/70 leading-relaxed font-normal">
                  Crafted with pure, skin-loving ingredients for ultimate care.
                </p>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-[rgba(26,28,24,0.06)] shadow-sm flex flex-col gap-2.5 hover:-translate-y-1 transition-transform duration-300">
                <span className="text-2xl">🐇</span>
                <h3 className="text-base font-semibold text-[#1a1c18]">Cruelty-Free</h3>
                <p className="text-[13.5px] text-[#1a1c18]/70 leading-relaxed font-normal">
                  Our products are never tested on animals, guaranteed ethical.
                </p>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-[rgba(26,28,24,0.06)] shadow-sm flex flex-col gap-2.5 hover:-translate-y-1 transition-transform duration-300">
                <span className="text-2xl">✨</span>
                <h3 className="text-base font-semibold text-[#1a1c18]">Expert Approved</h3>
                <p className="text-[13.5px] text-[#1a1c18]/70 leading-relaxed font-normal">
                  Carefully tested to ensure safety and visible results.
                </p>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-[rgba(26,28,24,0.06)] shadow-sm flex flex-col gap-2.5 hover:-translate-y-1 transition-transform duration-300">
                <span className="text-2xl">📦</span>
                <h3 className="text-base font-semibold text-[#1a1c18]">Free Shipping</h3>
                <p className="text-[13.5px] text-[#1a1c18]/70 leading-relaxed font-normal">
                  Delivered to your doorstep with no extra costs worldwide.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
