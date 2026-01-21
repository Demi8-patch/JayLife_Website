import { useRef, useState } from 'react';
import type { Ritual } from '~/lib/mock-data';
import { ProductCard } from './ProductCard';
import { ChevronLeftIcon, ChevronRightIcon } from '~/components/ui/Icons';

interface ProductCarouselProps {
  rituals: Ritual[];
  title?: string;
  subtitle?: string;
  darkMode?: boolean;
}

export function ProductCarousel({
  rituals,
  title = 'Bestsellers',
  subtitle,
  darkMode = false,
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = 320; // Approximate card width + gap
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className={`py-12 md:py-20 ${darkMode ? 'bg-dark' : 'bg-brand-cream'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between px-5 md:px-10 mb-8">
          <div>
            {subtitle && (
              <span
                className={`text-sm font-bold uppercase tracking-wider mb-2 block ${
                  darkMode ? 'text-electric-lime' : 'text-acid'
                }`}
              >
                {subtitle}
              </span>
            )}
            <h2
              className={`font-display font-bold text-2xl md:text-3xl ${
                darkMode ? 'text-white' : 'text-charcoal'
              }`}
            >
              {title}
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`
                p-3 rounded-full transition-all
                ${
                  canScrollLeft
                    ? darkMode
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-charcoal/5 hover:bg-charcoal/10 text-charcoal'
                    : 'opacity-30 cursor-not-allowed'
                }
                ${darkMode ? 'text-white' : 'text-charcoal'}
              `}
              aria-label="Scroll left"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`
                p-3 rounded-full transition-all
                ${
                  canScrollRight
                    ? darkMode
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-charcoal/5 hover:bg-charcoal/10 text-charcoal'
                    : 'opacity-30 cursor-not-allowed'
                }
                ${darkMode ? 'text-white' : 'text-charcoal'}
              `}
              aria-label="Scroll right"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-5 md:px-10 pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {rituals.map((ritual) => (
            <div key={ritual.handle} className="flex-shrink-0 w-[280px] md:w-[300px] snap-start">
              <ProductCard ritual={ritual} />
            </div>
          ))}
        </div>

        {/* Mobile Scroll Indicator */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {rituals.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                darkMode ? 'bg-white/30' : 'bg-charcoal/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
