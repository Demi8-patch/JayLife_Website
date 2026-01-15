import type { MetaFunction } from '@shopify/remix-oxygen';
import { RitualCard } from '~/components/product/RitualCard';
import { RITUALS } from '~/lib/mock-data';

export const meta: MetaFunction = () => {
  return [
    { title: 'All Rituals | Jay Life' },
    { name: 'description', content: 'Browse all Jay Life daily rituals.' },
  ];
};

export default function RitualsPage() {
  return (
    <div className="px-5 md:px-20 py-12 md:py-20">
      <h1 className="text-hero font-bold mb-2">All Rituals</h1>
      <p className="text-muted mb-12">Choose your daily protocol.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RITUALS.map((ritual) => (
          <RitualCard
            key={ritual.handle}
            ritual={ritual}
            onAddToCart={(r) => {
              console.log('Add to cart:', r.handle);
            }}
          />
        ))}
      </div>
    </div>
  );
}
