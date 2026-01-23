import { Link } from '@remix-run/react';
import { SaleBadge } from '~/components/ui/SaleBadge';
import { PriceDisplay } from '~/components/ui/PriceDisplay';
import { CartIcon, CheckIcon } from '~/components/ui/Icons';
import { useCart } from '~/lib/cart-context';

interface BundleProduct {
  title: string;
  image?: string;
  variantId?: string;
}

interface BundleCardProps {
  title: string;
  tagline: string;
  products: BundleProduct[];
  price: number;
  compareAtPrice: number;
  discountPercent: number;
  handle: string;
  variantId?: string;
  benefits?: string[];
}

export function BundleCard({
  title,
  tagline,
  products,
  price,
  compareAtPrice,
  discountPercent,
  handle,
  variantId,
  benefits = [],
}: BundleCardProps) {
  const { addItem, loading } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // If bundle has a single variant ID, add it
    // Otherwise, add each product's variant to cart
    if (variantId) {
      addItem(variantId);
    } else {
      // Add each product in the bundle that has a variantId
      products.forEach((product) => {
        if (product.variantId) {
          addItem(product.variantId);
        }
      });
    }
  };

  return (
    <div className="bundle-card bg-white rounded-2xl overflow-hidden shadow-lg border border-charcoal/5 flex flex-col h-full">
      {/* Images Row */}
      <div className="relative p-6 pb-4">
        <SaleBadge percent={discountPercent} position="top-right" />

        <div className="flex justify-center items-center gap-3">
          {products.slice(0, 3).map((product, index) => (
            <div
              key={index}
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-brand-cream flex-shrink-0"
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-charcoal/20 font-bold text-xs">
                  {product.title}
                </div>
              )}
            </div>
          ))}
          {products.length > 3 && (
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-charcoal/5 flex items-center justify-center text-charcoal/60 font-bold">
              +{products.length - 3}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 flex flex-col flex-grow">
        <Link to={`/bundle/${handle}`} className="block mb-3">
          <h3 className="font-display font-bold text-lg text-charcoal mb-1">{title}</h3>
          <p className="text-sm text-charcoal/70">{tagline}</p>
        </Link>

        {/* Benefits */}
        {benefits.length > 0 && (
          <ul className="space-y-1.5 mb-4">
            {benefits.slice(0, 3).map((benefit, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-charcoal/80">
                <CheckIcon className="w-4 h-4 text-electric-lime flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        )}

        {/* Price */}
        <div className="mb-4 mt-auto">
          <PriceDisplay
            price={price}
            compareAtPrice={compareAtPrice}
            discountPercent={discountPercent}
            size="md"
          />
        </div>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={loading}
          className={`btn-add-to-cart w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <CartIcon className="w-5 h-5" />
          )}
          {loading ? 'Adding...' : 'Add Bundle to Cart'}
        </button>
      </div>
    </div>
  );
}
