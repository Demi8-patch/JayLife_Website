import { MinusIcon, PlusIcon } from './Icons';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
  className = '',
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const sizeClasses = {
    sm: {
      button: 'w-8 h-8',
      icon: 'w-4 h-4',
      display: 'w-10 text-sm',
    },
    md: {
      button: 'w-10 h-10',
      icon: 'w-5 h-5',
      display: 'w-12 text-base',
    },
    lg: {
      button: 'w-12 h-12',
      icon: 'w-6 h-6',
      display: 'w-16 text-lg',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={`inline-flex items-center bg-white border border-brand-navy/10 rounded-xl overflow-hidden ${className}`}>
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min}
        className={`${classes.button} flex items-center justify-center text-brand-navy hover:bg-brand-cream transition-colors disabled:opacity-30 disabled:cursor-not-allowed`}
        aria-label="Decrease quantity"
      >
        <MinusIcon className={classes.icon} />
      </button>

      <span className={`${classes.display} text-center font-bold text-brand-navy`}>
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= max}
        className={`${classes.button} flex items-center justify-center text-brand-navy hover:bg-brand-cream transition-colors disabled:opacity-30 disabled:cursor-not-allowed`}
        aria-label="Increase quantity"
      >
        <PlusIcon className={classes.icon} />
      </button>
    </div>
  );
}
