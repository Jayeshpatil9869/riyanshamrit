import React, { useRef } from 'react';
import { Link } from '../context/RouterContext';
import { motion, useScroll, useTransform } from 'framer-motion';

// Interactive Double Text Roll Component
function RollLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      to={href}
      className="group inline-flex flex-col h-[1.3em] overflow-hidden text-[14px] sm:text-[14.5px] leading-[1.3em] no-underline self-center lg:self-start cursor-pointer text-center lg:text-left"
    >
      <span className="text-white/70 transition-transform duration-300 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full block font-normal">
        {label}
      </span>
      <span className="text-white font-medium transition-transform duration-300 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full block">
        {label}
      </span>
    </Link>
  );
}

export const Footer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress when the footer window comes into view for the smooth parallax peel
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.6, 0.85, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-auto lg:h-[540px] bg-[#1a1c18] lg:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
    >
      {/* Footer Content */}
      <footer
        id="editorial-footer"
        className="relative lg:fixed lg:bottom-0 lg:left-0 w-full lg:h-[540px] bg-[#1a1c18] text-white z-[1] flex flex-col justify-between pt-12 sm:pt-14 pb-8 sm:pb-10 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/5 select-none"
      >
        <motion.div
          style={{ opacity }}
          className="max-w-[1360px] w-full mx-auto flex flex-col justify-between h-full gap-6 lg:gap-8"
        >
          {/* Main Content Layout (Centered Stack on Mobile, 12-Col Grid on Desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* BRAND COLUMN (Description & Socials) */}
            <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left justify-between gap-6 lg:gap-8">
              <div className="flex flex-col items-center lg:items-start gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0">
                <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight">
                  About Kanva
                </h2>
                <p className="text-white/75 text-[14px] sm:text-[14.5px] leading-relaxed font-sans">
                  Combining nature and science, we create skincare that nurtures your skin and respects the planet. Healthy, radiant skin starts here.
                </p>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center justify-center lg:justify-start gap-3">
                {/* Framer */}
                <a
                  href="https://framer.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Framer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110"
                >
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
                  </svg>
                </a>
                {/* X / Twitter */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110"
                >
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* Behance */}
                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Behance"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110"
                >
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.726 3-3.084 0-5.46-2.093-5.46-5.5 0-3.355 2.376-5.5 5.25-5.5 3.033 0 4.935 2.144 4.935 5.5 0 .285-.015.617-.034.82h-7.854c.063 1.636 1.139 2.536 2.457 2.536 1.109 0 1.833-.519 2.238-1.356h3.194zm-6.883-3.23h4.633c-.086-1.336-.939-2.08-2.227-2.08-1.298 0-2.27.794-2.406 2.08zm-11.843 6.23h-5v-14h5.667c2.614 0 4.333 1.341 4.333 3.518 0 1.393-.728 2.511-1.895 3.064 1.545.541 2.395 1.873 2.395 3.593 0 2.417-1.844 3.825-5.5 3.825zm-2.5-8.25h2.667c1.378 0 2.167-.624 2.167-1.745 0-1.077-.789-1.673-2.167-1.673h-2.667v3.418zm0 5.832h2.833c1.554 0 2.5-.724 2.5-1.954 0-1.282-.946-1.996-2.5-1.996h-2.833v3.95z" />
                  </svg>
                </a>
                {/* Dribbble */}
                <a
                  href="https://dribbble.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Dribbble"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110"
                >
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm10.18 10.999c-.197-.015-2.457-.168-4.947.859-.221-.482-.457-.969-.706-1.455 3.428-1.527 4.792-3.479 4.887-3.621 1.258 1.884 1.766 4.195.766 4.217zm-6.282-5.263c-.126.177-1.424 1.947-4.664 3.375-1.229-2.274-2.569-4.398-2.684-4.582 1.05-.349 2.2-.549 3.45-.549 1.442 0 2.784.27 3.898.756zm-9.356 1.341c.119.186 1.443 2.275 2.686 4.521-2.99.882-5.908.904-6.312.904-.002-.167-.006-.334-.006-.502 0-2.029.744-3.885 1.972-5.311.53-.284 1.096-.511 1.66-.612zm-3.542 7.423c.374 0 2.871-.008 5.688-.799.362.723.704 1.452 1.025 2.18-3.076 1.849-4.148 4.606-4.227 4.819-1.583-1.638-2.544-3.856-2.486-6.2zm8.563 8.441c.099-.232 1.074-2.735 3.99-4.425 1.332 2.102 1.865 4.095 1.967 4.512-1.391.688-2.955 1.082-4.62 1.082-.455 0-.899-.033-1.337-.169zm7.042-2.316c-.144-.492-.729-2.274-1.957-4.238 2.305-.989 4.316-.921 4.537-.912-.132 2.101-1.002 3.995-2.58 5.15z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110"
                >
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* NAV LINKS (Centered Single-Column on Mobile, 3 Columns on Tablet/Desktop) */}
            <div className="lg:col-span-7 flex flex-col sm:grid sm:grid-cols-3 gap-8 sm:gap-10 text-center lg:text-left">
              
              {/* Pages Column */}
              <div className="flex flex-col items-center lg:items-start gap-2.5 sm:gap-3">
                <h3 className="text-white font-medium text-base sm:text-[15px] mb-0.5 tracking-wide">
                  Pages
                </h3>
                <nav className="flex flex-col items-center lg:items-start gap-2 sm:gap-1.5">
                  <RollLink href="/" label="Home" />
                  <RollLink href="/about" label="About" />
                  <RollLink href="/store" label="Shop" />
                  <RollLink href="/products/hydrating-serum" label="Shop Single" />
                  <RollLink href="/about" label="Blog" />
                  <RollLink href="/about" label="Blog Single" />
                  <RollLink href="/orders/failure" label="404" />
                  <RollLink href="/terms" label="Licensing" />
                </nav>
              </div>

              {/* Categories & Account Column */}
              <div className="flex flex-col items-center lg:items-start gap-5 sm:gap-6">
                <div className="flex flex-col items-center lg:items-start gap-2.5 sm:gap-3">
                  <h3 className="text-white font-medium text-base sm:text-[15px] mb-0.5 tracking-wide">
                    Categories
                  </h3>
                  <nav className="flex flex-col items-center lg:items-start gap-2 sm:gap-1.5">
                    <RollLink href="/store" label="All Products" />
                    <RollLink href="/store" label="Best Sellers" />
                    <RollLink href="/store" label="New Arrivals" />
                    <RollLink href="/store" label="Sale" />
                    <RollLink href="/store" label="Cleansers" />
                    <RollLink href="/store" label="Lotions" />
                    <RollLink href="/store" label="Moisturizers" />
                  </nav>
                </div>

                {/* Account Sub-Section */}
                <div className="flex flex-col items-center lg:items-start gap-2">
                  <h3 className="font-serif italic text-white/95 text-lg sm:text-base font-light">
                    Account &amp; Dispensary
                  </h3>
                  <nav className="flex flex-col items-center lg:items-start gap-2 sm:gap-1.5">
                    <RollLink href="/account/profile" label="Patron Profile" />
                    <RollLink href="/account/orders" label="Order Tracking" />
                    <RollLink href="/wishlist" label="Saved Formulations" />
                    <RollLink href="/admin" label="Admin Management Portal" />
                  </nav>
                </div>
              </div>

              {/* Support Column */}
              <div className="flex flex-col items-center lg:items-start gap-2.5 sm:gap-3">
                <h3 className="text-white font-medium text-base sm:text-[15px] mb-0.5 tracking-wide">
                  Support
                </h3>
                <nav className="flex flex-col items-center lg:items-start gap-2 sm:gap-1.5">
                  <RollLink href="/contact" label="Contact" />
                  <RollLink href="/about" label="FAQs" />
                  <RollLink href="/shipping" label="Shipping & Delivery" />
                  <RollLink href="/cancellation-refund" label="Orders & Returns" />
                  <RollLink href="/terms" label="Terms & Conditions" />
                </nav>
              </div>

            </div>

          </div>

          {/* Bottom Bar (Copyright & 2x2 / Row Payment Badges matching Reference) */}
          <div className="pt-5 sm:pt-6 pb-2 sm:pb-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-white/60 text-[13.5px] sm:text-[14px] text-center sm:text-left">
              © Made by <RollLink href="https://gola.supply" label="Gola Templates" />
            </div>

            {/* Payment Badges Grid */}
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-2">
              <span className="bg-[#252922] px-3.5 py-1.5 rounded-md text-xs font-semibold text-white/90 border border-white/10 flex items-center justify-center gap-1.5 min-w-[78px]">
                <span className="text-sm -mt-0.5"></span> Pay
              </span>
              <span className="bg-[#252922] px-3.5 py-1.5 rounded-md text-xs font-bold text-white/90 border border-white/10 lowercase flex items-center justify-center min-w-[78px]">
                stripe
              </span>
              <span className="bg-[#252922] px-3.5 py-1.5 rounded-md text-xs font-bold text-white/90 border border-white/10 italic flex items-center justify-center min-w-[78px]">
                VISA
              </span>
              <span className="bg-[#252922] px-3.5 py-1.5 rounded-md text-xs font-semibold text-white/90 border border-white/10 flex items-center justify-center min-w-[78px]">
                GPay
              </span>
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
};
