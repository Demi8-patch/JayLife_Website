import type { MetaFunction, LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, Link } from '@remix-run/react';
import { json } from '@shopify/remix-oxygen';
import { motion } from 'framer-motion';
import { getRitualByHandle, getSynergyRituals, type Ritual } from '~/lib/mock-data';
import { PlusIcon, CheckIcon } from '~/components/ui/Icons';
import { StarRating } from '~/components/ui/StarRating';
import { TrustBadge } from '~/components/ui/TrustBadge';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.ritual) {
    return [{ title: 'Ritual Not Found | Jay Life' }];
  }
  return [
    { title: `${data.ritual.title} | Jay Life` },
    { name: 'description', content: data.ritual.tagline },
    { property: 'og:title', content: `${data.ritual.title} | Jay Life` },
    { property: 'og:description', content: data.ritual.tagline },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const ritual = getRitualByHandle(params.handle || '');

  if (!ritual) {
    throw new Response('Ritual not found', { status: 404 });
  }

  const synergyRituals = ritual.synergyRituals
    ? getSynergyRituals(ritual.synergyRituals)
    : [];

  return json({ ritual, synergyRituals });
}

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function RitualPage() {
  const { ritual, synergyRituals } = useLoaderData<typeof loader>();

  const handleAddToCart = () => {
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    console.log('Add to cart:', ritual.handle);
  };

  return (
    <div className="bg-brand-cream/30 min-h-screen pb-20">
      {/* Breadcrumb nav */}
      <div className="max-w-7xl mx-auto px-5 py-6">
        <Link
          to="/rituals"
          className="text-brand-navy/60 hover:text-brand-navy transition-colors text-sm font-medium flex items-center gap-2"
        >
          ← Back to Shop
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Product visual */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="aspect-square bg-white rounded-3xl overflow-hidden shadow-xl sticky top-24"
          >
            {ritual.image ? (
              <img src={ritual.image} alt={ritual.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <span className="text-4xl font-display text-gray-400">{ritual.title}</span>
              </div>
            )}

            {/* Floating Trust Badge */}
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
              <CheckIcon className="w-4 h-4 text-brand-sage" />
              <span className="text-xs font-bold text-brand-navy uppercase tracking-wide">Lab Tested</span>
            </div>
          </motion.div>

          {/* Right: Product info */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="pt-4"
          >
            <div className="mb-4">
              <StarRating rating={4.8} count={124} />
            </div>

            <h1 className="font-display font-bold text-5xl text-brand-navy mb-4">{ritual.title}</h1>
            <p className="text-brand-navy/70 text-xl leading-relaxed mb-8">{ritual.tagline}</p>

            {/* Price block */}
            <div className="flex items-end gap-3 mb-8 pb-8 border-b border-brand-navy/10">
              <span className="font-display font-bold text-4xl text-brand-navy">${ritual.price}</span>
              <span className="text-brand-navy/60 mb-2">/ one-time purchase</span>
            </div>

            {/* Add to cart */}
            <div className="flex flex-col gap-4 mb-10">
              <button onClick={handleAddToCart} className="w-full bg-brand-navy text-white text-lg font-bold py-5 rounded-xl hover:bg-brand-sage transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0">
                Add to Cart — ${ritual.price}
              </button>
              <p className="text-center text-xs text-brand-navy/50">Free shipping on orders over $50 • 30-day guarantee</p>
            </div>

            {/* Trust Grid */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-brand-sage/10 rounded-full flex items-center justify-center text-2xl mb-2">🌿</div>
                <div className="text-xs font-bold text-brand-navy">Clean Ingredients</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-brand-sage/10 rounded-full flex items-center justify-center text-2xl mb-2">🔬</div>
                <div className="text-xs font-bold text-brand-navy">Science Backed</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-brand-sage/10 rounded-full flex items-center justify-center text-2xl mb-2">🛡️</div>
                <div className="text-xs font-bold text-brand-navy">3rd Party Tested</div>
              </div>
            </div>

            {/* Ingredients Accordion-ish */}
            <div className="bg-white rounded-2xl p-6 border border-brand-navy/5 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-lg text-brand-navy">What's Inside</h3>
                {ritual.labReportUrl && (
                  <a href={ritual.labReportUrl} className="text-xs font-bold text-brand-sage hover:underline">
                    View Lab Report
                  </a>
                )}
              </div>

              <ul className="space-y-4">
                {ritual.ingredients.map((ing, index) => (
                  <li key={ing.name} className="flex justify-between items-center pb-4 border-b border-brand-navy/5 last:border-0 last:pb-0">
                    <div>
                      <span className="block font-bold text-brand-navy">{ing.name}</span>
                      <span className="text-xs text-brand-navy/50">Clinical Grade</span>
                    </div>
                    <span className="font-mono text-sm bg-brand-cream px-3 py-1 rounded-full text-brand-navy">{ing.dose}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
