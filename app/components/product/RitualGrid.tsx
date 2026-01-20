import { Link } from '@remix-run/react';
import type { Ritual } from '~/lib/mock-data';

interface RitualGridProps {
  rituals: Ritual[];
}

export function RitualGrid({ rituals }: RitualGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {rituals.map((ritual) => (
        <Link
          key={ritual.handle}
          to={`/ritual/${ritual.handle}`}
          className="group relative"
        >
          {/* Card Container */}
          <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl flex flex-col">

            {/* Product Image Area */}
            <div className="h-80 w-full relative overflow-hidden bg-warm-sunrise-offwhite">
              {ritual.image ? (
                <img src={ritual.image} alt={ritual.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-display font-bold text-4xl text-warm-sunrise-charcoal/20">{ritual.title}</span>
                </div>
              )}

              {/* Sale Badge */}
              {ritual.discountPercent && ritual.discountPercent > 0 && (
                <div className="absolute top-0 right-0 bg-warm-sunrise-orange text-white px-3 py-1.5 text-xs font-bold">
                  {ritual.discountPercent}% OFF
                </div>
              )}

              {/* Badges */}
              {ritual.badges && ritual.badges.length > 0 && (
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {ritual.badges.map((badge: string) => (
                    <span key={badge} className="bg-warm-sunrise-charcoal text-white px-2 py-1 text-xs font-bold uppercase rounded">
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-display font-bold text-xl text-warm-sunrise-charcoal mb-2">
                {ritual.title}
              </h3>
              <p className="text-sm text-warm-sunrise-charcoal/70 mb-4 line-clamp-2">
                {ritual.tagline}
              </p>

              {/* Price */}
              <div className="mb-4">
                {ritual.compareAtPrice ? (
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xl text-warm-sunrise-charcoal">${ritual.price}</span>
                    <span className="text-sm line-through text-warm-sunrise-charcoal/40">${ritual.compareAtPrice}</span>
                  </div>
                ) : (
                  <span className="font-bold text-xl text-warm-sunrise-charcoal">${ritual.price}</span>
                )}
              </div>

              <div className="mt-auto">
                <button className="btn-add-to-cart">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
