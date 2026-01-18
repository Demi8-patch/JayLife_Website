import type { Ritual } from '~/lib/mock-data';
import { ProductCard } from './ProductCard';

interface RitualGridProps {
  rituals: Ritual[];
  onAddToCart?: (ritual: Ritual) => void;
}

export function RitualGrid({ rituals }: RitualGridProps) {
  return (
    <section className="px-5 md:px-10 py-12 md:py-20 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h2 className="font-display font-bold text-3xl text-brand-navy">Shop Our Collection</h2>
        <a href="/rituals" className="text-sm font-medium text-brand-navy border-b border-brand-navy pb-0.5 hover:text-brand-sage hover:border-brand-sage transition-colors">
          View all
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {rituals.map((ritual) => (
          <ProductCard
            key={ritual.handle}
            id={ritual.handle}
            title={ritual.title}
            tagline={ritual.tagline}
            price={`$${ritual.price}`}
            image={ritual.image || ''} // Handle missing image gracefully
            rating={4.8} // Mock rating for now
            reviewCount={120 + Math.floor(Math.random() * 500)} // Mock count
            handle={ritual.handle}
          />
        ))}
      </div>
    </section>
  );
}
