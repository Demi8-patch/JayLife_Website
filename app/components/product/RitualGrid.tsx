import type { Ritual } from '~/lib/mock-data';
import { PlusIcon } from '../ui/Icons';

interface RitualGridProps {
  rituals: Ritual[];
  onAddToCart?: (ritual: Ritual) => void;
}

/**
 * Vertical "protocol" style ritual grid
 * Clean, document-like layout with specs as hero
 */
export function RitualGrid({ rituals, onAddToCart }: RitualGridProps) {
  const handleAdd = (ritual: Ritual) => {
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    onAddToCart?.(ritual);
  };

  return (
    <section className="px-5 md:px-20 py-12 md:py-20">
      <h2 className="text-subhead font-medium text-muted mb-8">DAILY PROTOCOL</h2>

      <div className="space-y-0">
        {rituals.map((ritual, index) => (
          <div key={ritual.handle}>
            {/* Divider */}
            {index > 0 && <hr className="border-charcoal/10 my-8" />}

            {/* Ritual row */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              {/* Left: Info */}
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-2">{ritual.title}</h3>
                <p className="font-mono text-specs text-muted">
                  {ritual.ingredients.map((i) => `${i.name} ${i.dose}`).join(' · ')}
                </p>
                <p className="text-muted text-sm mt-2">{ritual.tagline}</p>
              </div>

              {/* Right: Price + Add */}
              <div className="flex items-center gap-4 md:gap-6">
                <span className="font-mono text-lg">${ritual.price}</span>
                <button
                  onClick={() => handleAdd(ritual)}
                  className="min-h-touch min-w-touch flex items-center justify-center rounded-full bg-charcoal text-cream hover:bg-charcoal/90 transition-colors focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2"
                  aria-label={`Add ${ritual.title} to cart`}
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lab reports link */}
      <div className="mt-12 text-right">
        <a href="#" className="text-sm text-muted hover:text-charcoal transition-colors">
          View lab reports →
        </a>
      </div>
    </section>
  );
}
