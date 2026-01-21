import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import type { Ritual } from '~/lib/mock-data';
import { PlusIcon } from '../ui/Icons';

interface RitualCardProps {
  ritual: Ritual;
  onAddToCart?: (ritual: Ritual) => void;
  featured?: boolean;
}

export function RitualCard({ ritual, onAddToCart, featured = false }: RitualCardProps) {
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    onAddToCart?.(ritual);
  };

  return (
    <motion.article
      className="ritual-card card-interactive group"
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
    >
      {/* Badges row */}
      <div className="flex gap-2 mb-4">
        {featured && <span className="badge-info">Popular</span>}
        <span className="badge-success">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Lab verified
        </span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-baseline mb-4">
        <Link to={`/ritual/${ritual.handle}`} className="group/link">
          <h3 className="font-display text-headline group-hover/link:text-charcoal/70 transition-colors">
            {ritual.title}
          </h3>
        </Link>
        <span className="font-mono text-specs text-charcoal">${ritual.price}</span>
      </div>

      {/* Tagline - moved up for faster scanning */}
      <p className="text-muted text-body mb-4">{ritual.tagline}</p>

      {/* Ingredients - collapsible on mobile for cleaner UX */}
      <details className="group/details mb-6">
        <summary className="text-caption text-muted cursor-pointer hover:text-charcoal transition-colors list-none flex items-center gap-1">
          <svg
            className="w-4 h-4 transition-transform group-open/details:rotate-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          View ingredients
        </summary>
        <div className="specs space-y-1 mt-3 pt-3 border-t border-charcoal/10">
          {ritual.ingredients.map((ing) => (
            <div key={ing.name} className="flex justify-between">
              <span>{ing.name}</span>
              <span className="text-charcoal">{ing.dose}</span>
            </div>
          ))}
        </div>
      </details>

      {/* Add button - full width, prominent */}
      <button onClick={handleAdd} className="btn-primary btn-full gap-2 group-hover:shadow-aura-sm">
        <PlusIcon className="w-5 h-5" />
        <span>Add to Cart</span>
      </button>

      {/* Quick link to learn more */}
      <Link
        to={`/ritual/${ritual.handle}`}
        className="block text-center text-caption text-muted mt-3 hover:text-charcoal transition-colors"
      >
        Learn more →
      </Link>
    </motion.article>
  );
}
