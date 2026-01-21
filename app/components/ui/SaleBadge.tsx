interface SaleBadgeProps {
  percent: number;
  position?: 'top-left' | 'top-right';
  className?: string;
}

export function SaleBadge({ percent, position = 'top-right', className = '' }: SaleBadgeProps) {
  const positionClasses = {
    'top-left': 'left-0 rounded-tr-xl rounded-bl-none',
    'top-right': 'right-0 rounded-tl-xl rounded-br-none',
  };

  return (
    <div
      className={`
        absolute top-0 ${positionClasses[position]}
        bg-sale-red text-white
        px-2.5 py-1.5
        text-xs font-bold
        z-10
        ${className}
      `}
    >
      {percent}% OFF
    </div>
  );
}

interface ProductBadgeProps {
  type: 'Bestseller' | 'New' | 'Limited' | 'Sale';
  className?: string;
}

export function ProductBadge({ type, className = '' }: ProductBadgeProps) {
  const badgeStyles = {
    Bestseller: 'bg-electric-lime text-dark',
    New: 'bg-charcoal text-white',
    Limited: 'bg-amber-500 text-white',
    Sale: 'bg-sale-red text-white',
  };

  return (
    <span
      className={`
        inline-flex items-center
        px-2.5 py-1
        text-xs font-bold uppercase tracking-wide
        rounded-md
        ${badgeStyles[type]}
        ${className}
      `}
    >
      {type}
    </span>
  );
}
