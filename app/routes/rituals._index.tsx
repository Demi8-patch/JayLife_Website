import type { MetaFunction } from '@shopify/remix-oxygen';
import { ProductCard } from '~/components/product/ProductCard';
import { RITUALS } from '~/lib/mock-data';

export const meta: MetaFunction = () => {
  return [
    { title: 'Shop Our Collection | Jay Life' },
    { name: 'description', content: 'Explore our range of science-backed wellness routines.' },
  ];
};

export default function RitualsPage() {
  return (
    <div className="bg-brand-cream/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-20 text-center lg:text-left">
        <h1 className="font-display font-bold text-5xl md:text-6xl text-brand-navy mb-4">Our Collection</h1>
        <p className="text-brand-navy/60 text-lg mb-12 max-w-2xl">
          Choose the routine that fits your lifestyle. Clinically-backed doses, zero fillers, and real results.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {RITUALS.map((ritual) => (
            <ProductCard
              key={ritual.handle}
              id={ritual.handle}
              title={ritual.title}
              tagline={ritual.tagline}
              price={`$${ritual.price}`}
              image={ritual.image || ''}
              rating={4.8}
              reviewCount={150 + Math.floor(Math.random() * 200)}
              handle={ritual.handle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
