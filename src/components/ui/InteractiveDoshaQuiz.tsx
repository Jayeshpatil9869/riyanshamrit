import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { X, Sparkles, Check, ArrowRight, RotateCcw, Heart, ShieldCheck } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { RIYANSH_PRODUCTS } from '../../data/products';
import { BorderBeam } from './BorderBeam';
import { ShimmerButton } from './ShimmerButton';

interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: {
    text: string;
    description: string;
    dosha: 'vata' | 'pitta' | 'kapha';
  }[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Energy & Metabolism',
    question: 'How does your daily vitality and digestive fire typically feel?',
    options: [
      {
        text: 'Fluctuating & Variable',
        description: 'Bursts of quick inspiration followed by sudden fatigue and light, irregular digestion.',
        dosha: 'vata',
      },
      {
        text: 'Intense & Quick-Paced',
        description: 'Strong, demanding appetite; high internal heat, ambitious energy that needs grounding.',
        dosha: 'pitta',
      },
      {
        text: 'Steady & Enduring',
        description: 'Calm and grounded, slow awakening in the morning, steady digestion that can feel sluggish.',
        dosha: 'kapha',
      },
    ],
  },
  {
    id: 2,
    category: 'Mind & Sleep Cycles',
    question: 'What characterizes your sleep and cognitive patterns?',
    options: [
      {
        text: 'Light & Vivid Dreams',
        description: 'Active, buzzing thoughts at night, waking easily between 2 AM – 4 AM.',
        dosha: 'vata',
      },
      {
        text: 'Direct & Intense',
        description: 'Sharp focus throughout the day, moderate sleep but prone to night heat or overthinking plans.',
        dosha: 'pitta',
      },
      {
        text: 'Deep & Heavy Sleep',
        description: 'Can sleep 8–9 hours effortlessly, peaceful mind, occasionally difficult to initiate morning tasks.',
        dosha: 'kapha',
      },
    ],
  },
  {
    id: 3,
    category: 'Skin & Physical Constitution',
    question: 'How does your skin and joint structure respond to changing seasons?',
    options: [
      {
        text: 'Dry, Delicate & Cool',
        description: 'Prone to dryness, cold extremities, and delicate joint flexibility.',
        dosha: 'vata',
      },
      {
        text: 'Warm, Sensitive & Flushed',
        description: 'Prone to redness, warmth, sensitive breakouts, and reacts quickly to sunlight.',
        dosha: 'pitta',
      },
      {
        text: 'Supple, Oily & Resilient',
        description: 'Thick, naturally hydrated skin with good elasticity and sturdy frame.',
        dosha: 'kapha',
      },
    ],
  },
];

interface InteractiveDoshaQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveDoshaQuiz: React.FC<InteractiveDoshaQuizProps> = ({
  isOpen,
  onClose,
}) => {
  const { addToCart, formatPrice } = useCommerce();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'vata' | 'pitta' | 'kapha'>>({});
  const [isCalculated, setIsCalculated] = useState(false);

  const handleSelectOption = (questionId: number, dosha: 'vata' | 'pitta' | 'kapha') => {
    setAnswers((prev) => ({ ...prev, [questionId]: dosha }));
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate outcome
      setIsCalculated(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#dac5a7', '#2b3323', '#d99b26', '#ffffff'],
      });
    }
  };

  const calculateDominantDosha = (): {
    primary: 'vata' | 'pitta' | 'kapha';
    name: string;
    element: string;
    description: string;
    recommendedProduct: typeof RIYANSH_PRODUCTS[0];
  } => {
    const counts = { vata: 0, pitta: 0, kapha: 0 };
    Object.values(answers).forEach((d) => {
      counts[d] = (counts[d] || 0) + 1;
    });

    let primary: 'vata' | 'pitta' | 'kapha' = 'vata';
    if (counts.pitta > counts.vata && counts.pitta >= counts.kapha) {
      primary = 'pitta';
    } else if (counts.kapha > counts.vata && counts.kapha > counts.pitta) {
      primary = 'kapha';
    }

    if (primary === 'pitta') {
      return {
        primary: 'pitta',
        name: 'Pitta (Fire & Water)',
        element: 'Tejas & Jala — Digestive Radiance',
        description:
          'Your constitution possesses fierce metabolic transformation and radiant mental clarity. Your botanical regimen requires cooling, soothing adaptogens to balance internal thermal warmth and support luminous, calm skin.',
        recommendedProduct:
          RIYANSH_PRODUCTS.find((p) => p.id === 'prod-02' || p.id === 'prod-08') ||
          RIYANSH_PRODUCTS[1],
      };
    }

    if (primary === 'kapha') {
      return {
        primary: 'kapha',
        name: 'Kapha (Earth & Water)',
        element: 'Prithvi & Jala — Structural Stability',
        description:
          'Your constitution is characterized by immense endurance, calm emotional stability, and protective tissue vitality. Your botanical regimen thrives on stimulating, detoxifying bitter elixirs and invigorating metabolic tonics.',
        recommendedProduct:
          RIYANSH_PRODUCTS.find((p) => p.id === 'prod-01' || p.id === 'prod-03') ||
          RIYANSH_PRODUCTS[0],
      };
    }

    // Default Vata
    return {
      primary: 'vata',
      name: 'Vata (Ether & Air)',
      element: 'Akasha & Vayu — Kinetic Vitality',
      description:
        'Your constitution channels high creative vitality, nervous system velocity, and visionary focus. Your botanical regimen requires deeply grounding, warm ojas-building Rasayanas to cultivate centered stamina and peaceful sleep.',
      recommendedProduct:
        RIYANSH_PRODUCTS.find((p) => p.id === 'prod-04' || p.id === 'prod-06') ||
        RIYANSH_PRODUCTS[3],
    };
  };

  const result = isCalculated ? calculateDominantDosha() : null;

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCalculated(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#191c18]/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#ffffff] rounded-3xl shadow-2xl overflow-hidden z-10 border border-[#e8e8e1]"
        >
          <BorderBeam size={260} duration={14} colorFrom="#dac5a7" colorTo="#3c4433" />

          {/* Header */}
          <div className="p-6 sm:p-8 bg-[#2b3323] text-white relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-white/10 text-[#dac5a7]">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-xs uppercase tracking-widest font-mono text-[#dac5a7]">
                  Vedic Diagnostic Engine
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif mt-3 text-white">
              {isCalculated
                ? 'Your Ayurvedic Constitution Profile'
                : 'Discover Your Dominant Dosha'}
            </h2>
            <p className="text-sm text-white/70 mt-1 max-w-lg">
              {isCalculated
                ? 'Customized formulation synthesis based on classical Tridosha principles.'
                : 'Answer 3 brief questions to receive your tailored clinical herbal prescription.'}
            </p>

            {/* Progress indicators */}
            {!isCalculated && (
              <div className="flex items-center gap-2 mt-5">
                {QUESTIONS.map((q, idx) => (
                  <div
                    key={q.id}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      idx <= currentStep ? 'bg-[#dac5a7]' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8">
            {!isCalculated ? (
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#1a1c18]/50 uppercase mb-2">
                  <span>Category: {QUESTIONS[currentStep].category}</span>
                  <span>
                    Question {currentStep + 1} of {QUESTIONS.length}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif text-[#1a1c18] mb-6">
                  {QUESTIONS[currentStep].question}
                </h3>

                <div className="space-y-3">
                  {QUESTIONS[currentStep].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(QUESTIONS[currentStep].id, opt.dosha)}
                      className="w-full text-left p-4 sm:p-5 rounded-2xl border border-[#e8e8e1] bg-[#f9f9f7] hover:bg-[#ffffff] hover:border-[#dac5a7] hover:shadow-md transition-all duration-200 group flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div>
                        <div className="font-serif text-lg text-[#1a1c18] group-hover:text-[#2b3323] transition-colors">
                          {opt.text}
                        </div>
                        <p className="text-xs sm:text-sm text-[#1a1c18]/70 mt-1 leading-relaxed">
                          {opt.description}
                        </p>
                      </div>
                      <div className="w-6 h-6 rounded-full border border-[#dbdbd1] flex items-center justify-center shrink-0 mt-1 group-hover:border-[#2b3323] group-hover:bg-[#2b3323] group-hover:text-white transition-colors">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              result && (
                <div className="space-y-6">
                  {/* Result Badge */}
                  <div className="p-5 rounded-2xl bg-[#f2f2ef] border border-[#dbdbd1]">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#757d5c] uppercase tracking-wider mb-1">
                      <ShieldCheck className="w-4 h-4" />
                      {result.element}
                    </div>
                    <h3 className="text-2xl font-serif text-[#2b3323]">{result.name}</h3>
                    <p className="text-sm text-[#1a1c18]/80 mt-2 leading-relaxed">
                      {result.description}
                    </p>
                  </div>

                  {/* Recommended Formulation Card */}
                  <div className="p-5 rounded-2xl border border-[#dac5a7]/40 bg-[#faf8f5] flex flex-col sm:flex-row items-center gap-5">
                    <img
                      src={result.recommendedProduct.image}
                      alt={result.recommendedProduct.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl shadow-sm shrink-0"
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <span className="text-[11px] uppercase tracking-widest font-mono bg-[#dac5a7]/40 text-[#2b3323] px-2 py-0.5 rounded">
                        Targeted Synergy Match
                      </span>
                      <h4 className="font-serif text-lg text-[#1a1c18] mt-1.5">
                        {result.recommendedProduct.name}
                      </h4>
                      <div className="text-sm font-mono text-[#2b3323] font-medium mt-1">
                        {formatPrice(result.recommendedProduct.price)}{' '}
                        <span className="text-xs text-[#1a1c18]/40 line-through">
                          {formatPrice(result.recommendedProduct.compareAtPrice)}
                        </span>
                      </div>
                      <p className="text-xs text-[#1a1c18]/65 mt-1 line-clamp-2">
                        {result.recommendedProduct.tagline}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        addToCart(result.recommendedProduct);
                        onClose();
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#2b3323] text-white text-xs uppercase tracking-wider font-mono hover:bg-[#191c18] transition-colors shrink-0 cursor-pointer"
                    >
                      Add to Bag
                    </button>
                  </div>

                  {/* Modal Footer Controls */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={resetQuiz}
                      className="flex items-center gap-1.5 text-xs text-[#1a1c18]/60 hover:text-[#1a1c18] font-mono cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Retake Diagnostic
                    </button>
                    <ShimmerButton
                      onClick={() => {
                        addToCart(result.recommendedProduct);
                        onClose();
                      }}
                      background="#2b3323"
                      className="!py-2.5 !px-6 !text-xs !font-mono uppercase tracking-widest"
                    >
                      <Check className="w-3.5 h-3.5" /> Claim Custom Regimen
                    </ShimmerButton>
                  </div>
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
