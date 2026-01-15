import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import type { Ritual } from '~/lib/mock-data';
import { PlusIcon } from '../ui/Icons';

interface RitualCardProps {
  ritual: Ritual;
  onAddToCart?: (ritual: Ritual) => void;
}

export function RitualCard({ ritual, onAddToCart }: RitualCardProps) {
  const handleAdd = () => {
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    onAddToCart?.(ritual);
  };

  return (
    <motion.article
      className="ritual-card"
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
    >
      {/* Header */}
      <div className="flex justify-between items-baseline mb-4">
        <Link to={`/ritual/${ritual.handle}`}>
          <h3 className="font-bold text-xl hover:text-charcoal/70 transition-colors">
            {ritual.title}
          </h3>
        </Link>
        <span className="font-mono text-specs">${ritual.price}</span>
      </div>

      {/* Ingredients */}
      <div className="specs space-y-1 mb-4">
        {ritual.ingredients.map((ing) => (
          <div key={ing.name} className="flex justify-between">
            <span>{ing.name}</span>
            <span>{ing.dose}</span>
          </div>
        ))}
      </div>

      {/* Tagline */}
      <p className="text-muted text-sm mb-6">{ritual.tagline}</p>

      {/* Add button */}
      <button onClick={handleAdd} className="btn-primary gap-2">
        <PlusIcon className="w-5 h-5" />
        <span>Add to ritual</span>
      </button>

      {/* Lab verified badge */}
      <p className="text-caption text-muted mt-3 text-center">Lab verified</p>
    </motion.article>
  );
}
