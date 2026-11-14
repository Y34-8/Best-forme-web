import {useState, useEffect, useCallback} from 'react';
import {motion, AnimatePresence, useReducedMotion} from 'motion/react';
import {ArrowRight, MessageSquare, ChevronLeft, ChevronRight} from 'lucide-react';
import {gymConfig} from '../config/gymConfig';
import {ResilientImage} from './ResilientImage';

interface HeroSectionProps {
  onDiscoverPlans: () => void;
  onContactClick: () => void;
}

export function HeroSection({onDiscoverPlans, onContactClick}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const slides = gymConfig.media.heroSlides;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused || prefersReducedMotion || slides.length <= 1) return;
    const timer = window.setInterval(goToNext, 5500);
    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion, slides.length, goToNext]);

  const activeSlide = slides[currentIndex];

  return (
    <section
      id="accueil"
      className="relative bg-zinc-950 text-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Hero Canvas with 3-Image Background Carousel */}
      <div
        role="region"
        aria-roledescription="carrousel"
        aria-label="Aperçu des espaces BEST FORME"
        className="relative min-h-[78vh] lg:min-h-[82vh] flex items-center"
      >
        {/* Carousel Image Layer */}
        <div className="absolute inset-0 overflow-hidden bg-zinc-950">
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={activeSlide.id}
              initial={prefersReducedMotion ? false : {opacity: 0, scale: 1.03}}
              animate={{opacity: 1, scale: 1}}
              exit={prefersReducedMotion ? {opacity: 0} : {opacity: 0}}
              transition={{duration: 0.7, ease: [0.16, 1, 0.3, 1]}}
              className="absolute inset-0"
            >
              <ResilientImage
                src={activeSlide.image}
                alt={activeSlide.alt}
                className="w-full h-full object-cover object-center"
                fallbackTitle="BEST FORME CASABLANCA"
              />
            </motion.div>
          </AnimatePresence>

          {/* Measured Contrast Scrims */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950/30 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/45 pointer-events-none"
          />
        </div>

        {/* Hero Copy & Primary Focal Anchor */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <motion.div
            initial={prefersReducedMotion ? false : {opacity: 0, y: 18}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
            className="max-w-3xl"
          >
            <p className="text-xs sm:text-sm font-medium tracking-[0.18em] uppercase text-red-500 mb-4">
              Casablanca, Maroc · Musculation · Cardio · Coaching
            </p>

            <h1
              style={{textWrap: 'balance'}}
              className="font-display font-extrabold text-[clamp(2.35rem,5vw,4.5rem)] leading-[1.03] tracking-tight text-white mb-6"
            >
              {gymConfig.slogan}
            </h1>

            <p className="text-base sm:text-lg text-zinc-200 leading-relaxed max-w-2xl mb-9">
              {gymConfig.heroSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onDiscoverPlans}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-red-600 hover:bg-red-500 active:scale-[0.98] rounded-md transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
              >
                <span>Découvrir nos abonnements</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onContactClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/25 hover:border-white/40 active:scale-[0.98] rounded-md transition-all duration-150 whitespace-nowrap shrink-0 backdrop-blur-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <MessageSquare className="w-4 h-4 text-red-400" aria-hidden="true" />
                <span>Nous contacter</span>
              </button>
            </div>
          </motion.div>

          {/* Carousel Controls Bar */}
          <div className="mt-12 lg:mt-16 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300">
              <span className="font-mono font-semibold text-red-500 tabular-nums">
                0{currentIndex + 1} / 0{slides.length}
              </span>
              <span aria-hidden="true" className="text-zinc-600">
                ·
              </span>
              <span className="font-medium text-white">{activeSlide.label}</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Slide Selector Bars */}
              <div className="flex items-center gap-2 mr-2" role="tablist" aria-label="Choisir une image">
                {slides.map((slide, index) => {
                  const isActive = index === currentIndex;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Afficher ${slide.label}`}
                      onClick={() => setCurrentIndex(index)}
                      className="py-2 px-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-red-500"
                    >
                      <span
                        className={`block h-1 rounded-full transition-all duration-200 ${
                          isActive ? 'w-10 bg-red-600' : 'w-5 bg-white/30 hover:bg-white/55'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next Arrows */}
              <button
                type="button"
                onClick={goToPrev}
                aria-label="Image précédente"
                className="w-11 h-11 inline-flex items-center justify-center rounded-md bg-zinc-950/75 hover:bg-red-600 border border-white/20 text-white transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-red-500"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                aria-label="Image suivante"
                className="w-11 h-11 inline-flex items-center justify-center rounded-md bg-zinc-950/75 hover:bg-red-600 border border-white/20 text-white transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-red-500"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width 4-Column Architectural Strip */}
      <div className="relative z-10 border-t border-white/10 bg-zinc-950/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800/80">
            {gymConfig.heroMetrics.map((item) => (
              <div key={item.label} className="py-6 lg:px-8 first:lg:pl-0 last:lg:pr-0">
                <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
