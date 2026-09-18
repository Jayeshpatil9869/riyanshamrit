/**
 * Kanva Motion Physics & Transition System
 * Exact Framer Motion profiles reverse-engineered from Kanva Master Specification
 */

export const transitions = {
  // Global page enter wipe transition
  pageEnter: {
    type: 'tween' as const,
    ease: [0.27, 0, 0.51, 1],
    duration: 0.45,
  },

  // High-fidelity spring for UI elements, cards & drawers
  springSmooth: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
    mass: 1,
  },

  // Bouncy spring for badges, icons, and buttons
  springBouncy: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 25,
    mass: 0.8,
  },

  // Gentle physical spring for modal backdrops and floating cards
  springGentle: {
    type: 'spring' as const,
    stiffness: 280,
    damping: 28,
  },

  // Micro-interaction button tap
  buttonTap: {
    scale: 0.95,
    transition: { duration: 0.08, ease: 'easeOut' },
  },

  // Button & Card Hover
  cardHover: {
    y: -6,
    transition: { type: 'spring' as const, stiffness: 350, damping: 25 },
  },
};

export const variants = {
  // Staggered list container
  staggerContainer: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  },

  // Staggered child item
  staggerItem: {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 300, damping: 28 },
    },
  },

  // Fade In Up reveal
  fadeInUp: {
    hidden: { opacity: 0, y: 32 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    },
  },

  // Scale in for modals & popups
  scaleIn: {
    hidden: { opacity: 0, scale: 0.94, y: 10 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 420, damping: 30 },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.18, ease: 'easeInOut' },
    },
  },

  // Slide in from right for drawer
  slideInRight: {
    hidden: { x: '100%', opacity: 0.5 },
    show: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 380, damping: 35 },
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: { duration: 0.25, ease: [0.32, 0, 0.67, 0] },
    },
  },

  // Reveal clip path
  clipReveal: {
    hidden: { clipPath: 'inset(100% 0 0 0)' },
    show: {
      clipPath: 'inset(0% 0 0 0)',
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  },
};
