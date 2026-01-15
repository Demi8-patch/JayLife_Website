import type { MetaFunction, LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, Link } from '@remix-run/react';
import { json } from '@shopify/remix-oxygen';
import { getRitualByHandle, getSynergyRituals, type Ritual } from '~/lib/mock-data';
import { PlusIcon } from '~/components/ui/Icons';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.ritual) {
    return [{ title: 'Ritual Not Found | Jay Life' }];
  }
  return [
    { title: `${data.ritual.title} | Jay Life` },
    { name: 'description', content: data.ritual.tagline },
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

export default function RitualPage() {
  const { ritual, synergyRituals } = useLoaderData<typeof loader>();

  const handleAddToCart = () => {
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    console.log('Add to cart:', ritual.handle);
  };

  return (
    <div className="px-5 md:px-20 py-12 md:py-20">
      {/* Back link */}
      <Link
        to="/rituals"
        className="text-muted text-sm hover:text-charcoal transition-colors mb-8 inline-block"
      >
        ← Back to rituals
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* Left: Product image placeholder */}
        <div className="aspect-square bg-white rounded-card flex items-center justify-center shadow-aura">
          <div className="text-6xl font-bold text-acid">{ritual.title[0]}</div>
        </div>

        {/* Right: Product info */}
        <div>
          <h1 className="text-hero md:text-hero-lg font-bold mb-2">{ritual.title}</h1>
          <p className="text-muted text-lg mb-8">{ritual.tagline}</p>

          {/* Ingredients */}
          <div className="mb-8">
            <h2 className="text-sm font-medium text-muted mb-4 flex items-center gap-2">
              INGREDIENTS
              <span className="text-xs bg-charcoal/5 px-2 py-0.5 rounded">Lab verified</span>
            </h2>
            <div className="specs space-y-2 bg-white p-4 rounded-card">
              {ritual.ingredients.map((ing) => (
                <div key={ing.name} className="flex justify-between">
                  <span>{ing.name}</span>
                  <span>{ing.dose}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price + Add */}
          <div className="flex items-center gap-6 mb-8">
            <span className="text-2xl font-bold">${ritual.price}</span>
            <span className="text-muted">/month</span>
          </div>

          <button onClick={handleAddToCart} className="btn-primary gap-2 mb-4">
            <PlusIcon className="w-5 h-5" />
            <span>Add to ritual</span>
          </button>

          {ritual.labReportUrl && (
            <a
              href={ritual.labReportUrl}
              className="text-sm text-muted hover:text-charcoal transition-colors block text-center"
            >
              View lab report →
            </a>
          )}
        </div>
      </div>

      {/* Synergy section */}
      {synergyRituals.length > 0 && (
        <section className="mt-20">
          <h2 className="text-subhead font-medium text-muted mb-8">PAIRS WELL WITH</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {synergyRituals.map((synergy) => (
              <Link
                key={synergy.handle}
                to={`/ritual/${synergy.handle}`}
                className="bg-white p-6 rounded-card hover:shadow-card transition-shadow"
              >
                <h3 className="font-bold text-lg mb-1">{synergy.title}</h3>
                <p className="text-muted text-sm">{synergy.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
