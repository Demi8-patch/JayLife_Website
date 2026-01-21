import { useLoaderData } from '@remix-run/react';
import type { MetaFunction } from '@shopify/remix-oxygen';
import { json } from '@shopify/remix-oxygen';
import { RitualGrid } from '~/components/product/RitualGrid';
import { storefront } from '~/lib/shopify.server';
import { PRODUCTS_QUERY, transformShopifyProduct } from '~/lib/queries';
import { RITUALS } from '~/lib/mock-data';

export const meta: MetaFunction = () => {
  return [
    { title: 'Shop Our Collection | Jay Life' },
    { name: 'description', content: 'Explore our range of science-backed wellness routines.' },
  ];
};

export async function loader() {
  try {
    // Try fetching from Shopify Storefront API
    const data = await storefront<{ products: { nodes: any[] } }>(PRODUCTS_QUERY, { first: 20 });

    // Transform Shopify products to our Ritual interface
    const products = data.products.nodes.map(transformShopifyProduct);

    return json({ products, source: 'shopify' as const });
  } catch (error) {
    // Log the error for debugging
    console.error('Shopify API error, falling back to mock data:', error);

    // Fall back to mock data
    return json({ products: RITUALS, source: 'mock' as const });
  }
}

export default function RitualsPage() {
  const { products } = useLoaderData<typeof loader>();

  return (
    <div className="bg-warm-sunrise-offwhite min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-warm-sunrise-charcoal to-warm-sunrise-charcoal/90 text-white pt-24 pb-12 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display font-bold text-4xl md:text-6xl mb-4">Shop All Rituals</h1>
          <p className="text-lg text-white/80 max-w-2xl">
            Science-backed supplements for focus, calm, and performance. <br />
            <span className="text-electric-lime font-bold">No gimmicks. Just results.</span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-10 py-16">
        <RitualGrid rituals={products} />
      </div>
    </div>
  );
}
