import { useState } from 'react';
import { HeartIcon, HeartFilledIcon } from './Icons';

interface WishlistButtonProps {
  productHandle: string;
  className?: string;
}

export function WishlistButton({ productHandle, className = '' }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }

    setIsWishlisted(!isWishlisted);
    // TODO: Add to wishlist state/localStorage
  };

  return (
    <button
      onClick={handleClick}
      className={`
        wishlist-btn
        ${isWishlisted ? 'active' : ''}
        ${className}
      `}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {isWishlisted ? (
        <HeartFilledIcon className="w-5 h-5 text-sale-red" />
      ) : (
        <HeartIcon className="w-5 h-5 text-muted hover:text-sale-red transition-colors" />
      )}
    </button>
  );
}
