import { Fragment, useState, useEffect } from 'react';
import { Link } from '@remix-run/react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Ritual } from '~/lib/mock-data';

interface CartItem {
  ritual: Ritual;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (handle: string, quantity: number) => void;
  onRemove: (handle: string) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
}: CartDrawerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.ritual.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-charcoal/50 z-50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cream z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-charcoal/10">
              <h2 className="font-display text-headline">Your ritual</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-charcoal/5 transition-colors"
                aria-label="Close cart"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted mb-4">Your cart is empty</p>
                  <button onClick={onClose} className="btn-ghost">
                    Continue shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <CartLineItem
                      key={item.ritual.handle}
                      item={item}
                      onUpdateQuantity={onUpdateQuantity}
                      onRemove={onRemove}
                    />
                  ))}
                </ul>
              )}
            </div>

            {/* Footer with totals */}
            {items.length > 0 && (
              <div className="border-t border-charcoal/10 p-5 space-y-4 bg-white">
                {/* Subtotal */}
                <div className="flex justify-between text-body">
                  <span className="text-muted">Subtotal ({itemCount} items)</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>

                {/* Free shipping threshold */}
                {subtotal < 50 && (
                  <div className="bg-acid/10 rounded-button p-3 text-center text-sm">
                    Add <span className="font-semibold">${(50 - subtotal).toFixed(2)}</span> more
                    for free shipping
                  </div>
                )}

                {subtotal >= 50 && (
                  <div className="bg-acid/20 rounded-button p-3 text-center text-sm font-medium">
                    <span className="text-charcoal">Free shipping unlocked</span>
                  </div>
                )}

                {/* Checkout button */}
                <Link
                  to="/checkout"
                  className="btn-primary btn-full btn-primary-lg"
                  onClick={onClose}
                >
                  Checkout · ${subtotal.toFixed(2)}
                </Link>

                {/* Continue shopping */}
                <button
                  onClick={onClose}
                  className="w-full text-center text-caption text-muted hover:text-charcoal transition-colors"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.div>
        </Fragment>
      )}
    </AnimatePresence>
  );
}

// Cart line item component
function CartLineItem({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  onUpdateQuantity: (handle: string, quantity: number) => void;
  onRemove: (handle: string) => void;
}) {
  const { ritual, quantity } = item;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-4 bg-white rounded-card p-4"
    >
      {/* Product info */}
      <div className="flex-1">
        <Link to={`/ritual/${ritual.handle}`}>
          <h3 className="font-semibold hover:text-charcoal/70 transition-colors">{ritual.title}</h3>
        </Link>
        <p className="text-caption text-muted mt-1">{ritual.tagline}</p>
        <p className="font-mono text-specs mt-2">${ritual.price.toFixed(2)}</p>
      </div>

      {/* Quantity controls */}
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center border border-charcoal/20 rounded-button">
          <button
            onClick={() => onUpdateQuantity(ritual.handle, quantity - 1)}
            disabled={quantity <= 1}
            className="w-8 h-8 flex items-center justify-center text-muted hover:text-charcoal disabled:opacity-30 transition-colors"
            aria-label="Decrease quantity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-8 text-center text-sm font-medium">{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(ritual.handle, quantity + 1)}
            className="w-8 h-8 flex items-center justify-center text-muted hover:text-charcoal transition-colors"
            aria-label="Increase quantity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>

        {/* Remove button */}
        <button
          onClick={() => onRemove(ritual.handle)}
          className="text-caption text-coral hover:text-coral/80 transition-colors"
        >
          Remove
        </button>
      </div>
    </motion.li>
  );
}
