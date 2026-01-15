import type { MetaFunction } from '@shopify/remix-oxygen';
import { Link } from '@remix-run/react';
import { RitualGrid } from '~/components/product/RitualGrid';
import { RITUALS } from '~/lib/mock-data';

export const meta: MetaFunction = () => {
  return [
    { title: 'Jay Life | Small upgrades compound' },
    { name: 'description', content: 'Daily rituals for focus, calm, and performance.' },
  ];
};

export default function Homepage() {
  return (
    <>
      {/* Hero Section */}
      <section className="px-5 md:px-20 py-16 md:py-24 text-center">
        <h1 className="text-hero md:text-hero-lg font-bold mb-6">
          Small upgrades
          <br />
          compound.
        </h1>
        <p className="text-muted text-body max-w-md mx-auto mb-8">
          Daily rituals for focus, calm, and performance.
          <br />
          Science-backed. No miracle claims.
        </p>
        <Link
          to="/rituals"
          className="inline-flex items-center justify-center min-h-touch px-8 bg-acid text-charcoal font-bold rounded-button transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          Start your ritual
        </Link>
      </section>

      {/* Ritual Grid */}
      <RitualGrid
        rituals={RITUALS}
        onAddToCart={(ritual) => {
          console.log('Add to cart:', ritual.handle);
          // TODO: Integrate with cart context
        }}
      />

      {/* Social Proof */}
      <section className="px-5 md:px-20 py-16 md:py-24 text-center bg-white">
        <p className="text-muted text-lg mb-2">Results typically appear in</p>
        <p className="text-hero font-bold">3-5 weeks</p>
        <p className="text-muted text-sm mt-4">That's when most people feel it.</p>
      </section>

      {/* CTA */}
      <section className="px-5 md:px-20 py-16 md:py-24 text-center">
        <h2 className="text-subhead font-bold mb-4">Ready to upgrade?</h2>
        <p className="text-muted mb-8">No commitments. Cancel anytime.</p>
        <Link
          to="/rituals"
          className="inline-flex items-center justify-center min-h-touch px-8 bg-charcoal text-cream font-bold rounded-button transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          View all rituals
        </Link>
      </section>
    </>
  );
}
