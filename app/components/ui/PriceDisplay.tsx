import { formatPrice } from '~/lib/mock-data';

interface PriceDisplayProps {
  price: number;
  compareAtPrice?: number;
  discountPercent?: number;
  size?: 'sm' | 'md' | 'lg';
  showSavings?: boolean;
  className?: string;
}

export function PriceDisplay({
  price,
  compareAtPrice,
  discountPercent,
  size = 'md',
  showSavings = false,
  className = '',
}: PriceDisplayProps) {
  const isOnSale = compareAtPrice && compareAtPrice > price;
  const savings = isOnSale ? compareAtPrice - price : 0;

  const sizeClasses = {
    sm: {
      current: 'text-base font-bold',
      original: 'text-sm',
      savings: 'text-xs px-1.5 py-0.5',
    },
    md: {
      current: 'text-xl font-bold',
      original: 'text-base',
      savings: 'text-sm px-2 py-0.5',
    },
    lg: {
      current: 'text-3xl font-bold',
      original: 'text-lg',
      savings: 'text-sm px-2.5 py-1',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {/* Current Price */}
      <span className={`${classes.current} text-charcoal`}>{formatPrice(price)}</span>

      {/* Original Price (strikethrough) */}
      {isOnSale && (
        <span className={`${classes.original} text-muted line-through`}>
          {formatPrice(compareAtPrice)}
        </span>
      )}

      {/* Discount Badge */}
      {isOnSale && discountPercent && (
        <span
          className={`${classes.savings} font-semibold rounded bg-sale-red-light text-sale-red`}
        >
          Save {discountPercent}%
        </span>
      )}

      {/* Savings Amount */}
      {isOnSale && showSavings && !discountPercent && (
        <span
          className={`${classes.savings} font-semibold rounded bg-electric-lime-subtle text-charcoal`}
        >
          Save {formatPrice(savings)}
        </span>
      )}
    </div>
  );
}
