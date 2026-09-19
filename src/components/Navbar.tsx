import React, { useState, useEffect } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { useCommerce } from '../context/CommerceContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  ChevronDown,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface NavLinkItem {
  label: string;
  href: string;
  isRouterLink?: boolean;
  hasDropdown?: boolean;
  dropdownType?: 'shop' | 'collections';
}

const navLinks: NavLinkItem[] = [
  { label: 'Shop', href: '/store', isRouterLink: true, hasDropdown: true, dropdownType: 'shop' },
  { label: 'About', href: '/about', isRouterLink: true },
  { label: 'Contact', href: '/contact', isRouterLink: true },
];

export const Navbar: React.FC = () => {
  const { currentPath } = useRouter();
  const {
    cartCount,
    setIsCartDrawerOpen,
    wishlistCount,
    setIsWishlistDrawerOpen,
    setIsSearchOpen,
    user
  } = useCommerce();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll dynamics: hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsVisible(false); // Scrolling DOWN -> hide
        setActiveDropdown(null);
      } else {
        setIsVisible(true); // Scrolling UP -> reveal
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 lg:px-8 py-3 transition-transform duration-500 ease-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div
          className={`w-full max-w-7xl transition-all duration-300 rounded-2xl px-5 sm:px-7 py-3 flex items-center justify-between bg-white/95 backdrop-blur-md border border-[rgba(26,28,24,0.08)] ${
            isScrolled
              ? 'shadow-[0_10px_35px_rgba(26,28,24,0.08)]'
              : 'shadow-[0_4px_20px_rgba(26,28,24,0.04)]'
          }`}
        >
          {/* ================= LEFT: NAVIGATION LINKS ================= */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.dropdownType || null)}
                onMouseLeave={() => link.hasDropdown && setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  className="group flex items-center gap-1.5 py-1 text-[14.5px] font-medium tracking-tight text-[#1a1c18] transition-colors"
                >
                  {/* Rolling Text Hover Animation */}
                  <div className="relative h-[20px] overflow-hidden">
                    <span className="block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full text-[#1a1c18]">
                      {link.label}
                    </span>
                    <span className="block absolute top-full left-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full text-[#757d5c] font-semibold">
                      {link.label}
                    </span>
                  </div>
                  {link.hasDropdown && (
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-300 ${
                        activeDropdown === link.dropdownType ? 'rotate-180 text-[#757d5c]' : 'text-[#1a1c18]/60'
                      }`}
                    />
                  )}
                </Link>

                {/* Dropdown Mega Menu Flyout */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {activeDropdown === link.dropdownType && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full -left-4 pt-4 w-[500px] z-50 pointer-events-auto"
                      >
                        <div className="bg-white rounded-2xl p-6 shadow-2xl border border-[rgba(26,28,24,0.08)] grid grid-cols-2 gap-6">
                          <div>
                            <p className="text-[11px] uppercase tracking-wider font-semibold text-[#1a1c18]/40 mb-3">
                              {link.dropdownType === 'shop' ? 'Categories' : 'Collections'}
                            </p>
                            <ul className="space-y-2.5">
                              {(link.dropdownType === 'shop'
                                ? ['Botanical Cleansers', 'Renewal Serums', 'Hydrating Creams', 'Body Elixirs', 'Travel Kits']
                                : ['Anti-Aging & Radiance', 'Daily Moisture Lock', 'Herbal Detox Therapy', 'Deep Skin Repair']
                              ).map((item) => (
                                <li key={item}>
                                  <Link
                                    to="/store"
                                    onClick={() => setActiveDropdown(null)}
                                    className="text-[13.5px] text-[#1a1c18]/80 hover:text-[#1a1c18] hover:translate-x-1 transition-all flex items-center justify-between group/item"
                                  >
                                    <span>{item}</span>
                                    <ArrowRight size={12} className="opacity-0 group-hover/item:opacity-100 transition-opacity text-[#757d5c]" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-[#f7f7f4] rounded-xl p-4 flex flex-col justify-between border border-[rgba(26,28,24,0.04)]">
                            <div>
                              <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#757d5c] mb-1">
                                <Sparkles size={12} />
                                <span>Featured Formulation</span>
                              </div>
                              <h4 className="font-serif italic text-[16px] text-[#1a1c18] mb-1">
                                Velvet Glow Elixir
                              </h4>
                              <p className="text-[12px] text-[#1a1c18]/65 leading-relaxed">
                                100% cold-pressed organic botanical actives &amp; squalane.
                              </p>
                            </div>
                            <Link
                              to="/store"
                              onClick={() => setActiveDropdown(null)}
                              className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#1a1c18] mt-4 hover:underline text-[#3c4433]"
                            >
                              Explore Product <ArrowRight size={12} />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* ================= CENTER: BRAND LOGO ================= */}
          <div className="flex items-center">
            <Link
              to="/"
              className="group flex flex-col items-center select-none"
            >
              <span className="font-serif text-[18px] xs:text-[20px] sm:text-[24px] lg:text-[26px] tracking-[-0.03em] font-normal uppercase text-[#1a1c18] transition-opacity group-hover:opacity-85 whitespace-nowrap">
                RIYANSH AMRIT
              </span>
              <span className="text-[9.5px] xs:text-[10px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.25em] uppercase font-sans font-semibold mt-0.5 sm:mt-0 text-[#4e583c]">
                Ayurvedic Botanicals
              </span>
            </Link>
          </div>

          {/* ================= RIGHT: UTILITIES & ACTIONS ================= */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            {/* Account Icon (Desktop & Tablet) */}
            <Link
              to={user ? '/account/orders' : '/login'}
              aria-label="Account"
              className="hidden sm:flex p-2 rounded-full hover:bg-[#f4f4f1] text-[#1a1c18] transition-colors items-center justify-center cursor-pointer"
            >
              <User size={18} strokeWidth={1.8} />
            </Link>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="hidden xs:flex p-2 rounded-full hover:bg-[#f4f4f1] text-[#1a1c18] transition-colors cursor-pointer"
            >
              <Search size={18} strokeWidth={1.8} />
            </button>

            {/* Favorites / Wishlist */}
            <button
              onClick={() => setIsWishlistDrawerOpen(true)}
              aria-label="Wishlist"
              className="relative p-1.5 sm:p-2 rounded-full hover:bg-[#f4f4f1] text-[#1a1c18] transition-colors cursor-pointer"
            >
              <Heart size={18} strokeWidth={1.8} />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#757d5c] text-white text-[8px] sm:text-[9px] font-bold flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Bag */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              aria-label="Cart"
              className="relative flex items-center gap-1.5 sm:gap-2 bg-[#1a1c18] hover:bg-[#3c4433] text-white px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-all hover:scale-[1.02] active:scale-[0.96] cursor-pointer shadow-xs"
            >
              <ShoppingBag size={15} strokeWidth={2} className="shrink-0" />
              <span className="font-semibold text-xs">{cartCount}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#f4f4f1] text-[#1a1c18] hover:bg-[#eaeae5] focus:outline-none ml-0.5 cursor-pointer"
              aria-label="Toggle Menu"
            >
              <span
                className={`block h-0.5 w-3.5 sm:w-4 bg-[#1a1c18] rounded transition-all duration-300 ease-out ${
                  mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                }`}
              />
              <span
                className={`block h-0.5 w-3.5 sm:w-4 bg-[#1a1c18] rounded transition-all duration-300 ease-out ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE DRAWER MODAL ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden pt-24 px-4 pb-6 flex flex-col"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl p-6 shadow-2xl border border-[rgba(26,28,24,0.08)] flex flex-col gap-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col divide-y divide-[rgba(26,28,24,0.06)]">
                {[
                  { label: 'Home', path: '/' },
                  { label: 'Shop All Formulations', path: '/store' },
                  { label: 'About Riyansh Amrit', path: '/about' },
                  { label: 'Contact & Support', path: '/contact' },
                  { label: 'Saved Wishlist', path: '/wishlist' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 text-[17px] font-medium text-[#1a1c18] flex items-center justify-between hover:text-[#757d5c] transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={16} className="text-[#1a1c18]/40" />
                  </Link>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-[rgba(26,28,24,0.06)] flex items-center justify-between text-xs text-[#1a1c18]/60">
                <span>Free Express Shipping Across India</span>
                <span className="font-medium text-[#757d5c]">Riyansh Amrit</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
