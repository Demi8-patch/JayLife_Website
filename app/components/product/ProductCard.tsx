import { Link } from '@remix-run/react';
import { CartIcon } from '~/components/ui/Icons';
import { PriceDisplay } from '~/components/ui/PriceDisplay';
import { ProductBadge, SaleBadge } from '~/components/ui/SaleBadge';
import { StarRating } from '~/components/ui/StarRating';
import { WishlistButton } from '~/components/ui/WishlistButton';
import { useCart } from '~/lib/cart-context';
import type { Ritual } from '~/lib/mock-data';

interface ProductCardProps {
  ritual: Ritual;
  className?: string;
}

export function ProductCard({ ritual, className = '' }: ProductCardProps) {
  const {
    handle,
    title,
    tagline,
    price,
    compareAtPrice,
    discountPercent,
    image,
    rating,
    reviewCount,
    badges,
    inStock,
    stockCount,
    variantId,
    id,
  } = ritual;

  const { addItem, loading } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const merchandiseId = variantId || id;
    if (!merchandiseId) return;

    addItem(merchandiseId);
  };

  return (
    <div
      className={`
        product-card-ecom
        group flex flex-col h-full
        ${className}
      `}
    >
      {/* Image Area */}
      <Link to={`/ritual/${handle}`} className="product-image relative">
        {/* Sale Badge */}
        {discountPercent && discountPercent > 0 && (
          <SaleBadge percent={discountPercent} position="top-right" />
        )}

        {/* Wishlist Button */}
        <WishlistButton productHandle={handle} />

        {/* Product Image */}
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            width={800}
            height={800}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-cream text-charcoal/20 font-display font-bold text-2xl">
            {title}
          </div>
        )}

        {/* Low Stock Warning */}
        {inStock && stockCount && stockCount <= 10 && (
          <div className="absolute bottom-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
            Only {stockCount} left
          </div>
        )}
      </Link>

      {/* Content Area */}
      <div className="product-info flex flex-col flex-grow">
        {/* Badges Row */}
        {badges && badges.length > 0 && (
          <div className="flex gap-2 mb-2">
            {badges.map((badge) => (
              <ProductBadge key={badge} type={badge} />
            ))}
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={rating} size="sm" showCount={false} />
          <span className="text-sm text-charcoal font-medium">{rating.toFixed(1)}</span>
          <span className="text-sm text-muted">({reviewCount})</span>
        </div>

        {/* Title & Tagline */}
        <Link to={`/ritual/${handle}`} className="block mb-3">
          <h3 className="font-display font-bold text-lg text-charcoal mb-1 group-hover:text-electric-lime transition-colors">
            {title}
          </h3>
          <p className="text-sm text-charcoal/70 line-clamp-2">{tagline}</p>
        </Link>

        {/* Price */}
        <div className="mb-4">
          <PriceDisplay
            price={price}
            compareAtPrice={compareAtPrice}
            discountPercent={discountPercent}
            size="md"
          />
        </div>

        {/* Add to Cart Button - Always Visible, Full Width */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!inStock || loading}
          className={`
            btn-add-to-cart mt-auto
            ${!inStock || loading ? 'opacity-50 cursor-not-allowed bg-gray-300' : ''}
          `}
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <CartIcon className="w-5 h-5" />
          )}
          {!inStock ? 'Out of Stock' : loading ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

