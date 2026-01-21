import { Link } from '@remix-run/react';
import { CartIcon } from '~/components/ui/Icons';
import { PriceDisplay } from '~/components/ui/PriceDisplay';
import { ProductBadge, SaleBadge } from '~/components/ui/SaleBadge';
import { StarRating } from '~/components/ui/StarRating';
import { WishlistButton } from '~/components/ui/WishlistButton';
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
  } = ritual;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }

    // TODO: Add to cart functionality
    console.log('Add to cart:', handle);
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
          disabled={!inStock}
          className={`
            btn-add-to-cart mt-auto
            ${!inStock ? 'opacity-50 cursor-not-allowed bg-gray-300' : ''}
          `}
        >
          <CartIcon className="w-5 h-5" />
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}

// Legacy interface for backwards compatibility
interface LegacyProductCardProps {
  id: string;
  title: string;
  tagline: string;
  price: string;
  image: string;
  rating: number;
  reviewCount: number;
  handle: string;
}

export function LegacyProductCard({
  title,
  tagline,
  price,
  image,
  rating,
  reviewCount,
  handle,
}: LegacyProductCardProps) {
  // Convert legacy props to Ritual format
  const priceNum = parseFloat(price.replace('$', ''));

  return (
    <ProductCard
      ritual={{
        handle,
        title,
        tagline,
        price: priceNum,
        image,
        rating,
        reviewCount,
        inStock: true,
        ingredients: [],
      }}
    />
  );
}
