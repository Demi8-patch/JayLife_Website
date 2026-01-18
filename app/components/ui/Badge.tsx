import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info';
  animated?: boolean;
  className?: string;
}

const variants = {
  default: 'bg-charcoal/10 text-charcoal',
  success: 'bg-acid/20 text-charcoal',
  warning: 'bg-coral/20 text-coral',
  info: 'bg-lavender text-charcoal',
};

export function Badge({
  children,
  variant = 'default',
  animated = false,
  className = '',
}: BadgeProps) {
  const baseClasses = `inline-flex items-center gap-1.5 px-3 py-1 text-caption font-medium rounded-full ${variants[variant]} ${className}`;

  if (animated) {
    return (
      <motion.span
        className={baseClasses}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    );
  }

  return <span className={baseClasses}>{children}</span>;
}

export function LabVerifiedBadge() {
  return (
    <Badge variant="success" className="gap-2">
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      Lab verified
    </Badge>
  );
}

export function BestsellerBadge() {
  return (
    <Badge variant="info">
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      Bestseller
    </Badge>
  );
}

export function LowStockBadge({ count }: { count: number }) {
  return (
    <Badge variant="warning" animated>
      Only {count} left
    </Badge>
  );
}
