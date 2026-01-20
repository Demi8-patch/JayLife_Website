import type { MetaFunction, LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { json } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { RitualGrid } from '~/components/product/RitualGrid';

export const meta: MetaFunction = () => {
  return [
    { title: 'Shop Our Collection | Jay Life' },
    { name: 'description', content: 'Explore our range of science-backed wellness routines.' },
  ];
};

export async function loader({ context }: LoaderFunctionArgs) {
  const { storefront } = context as { storefront: any };

  const PRODUCTS_QUERY = `#graphql
    query GetProducts($first: Int!) {
      products(first: $first) {
        nodes {
          id
          handle
          title
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
          }
          metafields(identifiers: [
            {namespace: "custom", key: "brand_color"},
            {namespace: "custom", key: "accent_color"},
            {namespace: "custom", key: "benefits"},
            {namespace: "custom", key: "ingredients"},
            {namespace: "custom", key: "badges"}
          ]) {
            namespace
            key
            value
            type
          }
        }
      }
    }
  `;

  try {
    const { products } = await storefront.query(PRODUCTS_QUERY, {
      variables: { first: 10 },
    });

    // Transform products
    const transformedProducts = products.nodes.map((shopifyProduct: any) => {
      const metafieldsMap = new Map();
      if (shopifyProduct.metafields) {
        shopifyProduct.metafields.forEach((metafield: any) => {
          if (metafield) {
            let value = metafield.value;
            if (metafield.type === 'json' || metafield.type === 'list.single_line_text_field') {
              try {
                value = JSON.parse(metafield.value);
              } catch {
                // Keep original value
              }
            }
            metafieldsMap.set(metafield.key, value);
          }
        });
      }

      const price = shopifyProduct.priceRange?.minVariantPrice
        ? parseFloat(shopifyProduct.priceRange.minVariantPrice.amount)
        : 0;

      return {
        handle: shopifyProduct.handle,
        title: shopifyProduct.title,
        tagline: shopifyProduct.description?.split('\n')[0] || '',
        description: shopifyProduct.description || '',
        price,
        image: shopifyProduct.featuredImage?.url || '/images/placeholder.jpg',
        ingredients: metafieldsMap.get('ingredients') || [],
        rating: 4.5,
        reviewCount: 0,
        inStock: true,
        benefits: metafieldsMap.get('benefits') || [],
        badges: metafieldsMap.get('badges') || [],
      };
    });

    return json({ products: transformedProducts });
  } catch (error) {
    console.error('Error fetching products:', error);
    return json({ products: [] });
  }
}

export default function RitualsPage() {
  const { products } = useLoaderData<typeof loader>();

  return (
    <div className="bg-warm-sunrise-offwhite min-h-screen">

      {/* Page Header */}
      <div className="bg-gradient-to-br from-warm-sunrise-charcoal to-warm-sunrise-charcoal/90 text-white pt-24 pb-12 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display font-bold text-4xl md:text-6xl mb-4">
            Shop All Rituals
          </h1>
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
