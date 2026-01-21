import { Fragment, useState, useEffect } from 'react';
import { Link } from '@remix-run/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart, type CartLine } from '~/lib/cart-context';

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    lines,
    updateItem,
    removeItem,
    subtotal,
    totalQuantity,
    checkoutUrl,
    loading,
  } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parse subtotal amount
  const subtotalAmount = parseFloat(subtotal.amount);
  const itemCount = totalQuantity;

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
            onClick={closeCart}
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
              <h2 className="font-display text-headline">
                Your ritual
                {loading && (
                  <span className="ml-2 inline-block w-4 h-4 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin" />
                )}
              </h2>
              <button
                onClick={closeCart}
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
              {lines.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted mb-4">Your cart is empty</p>
                  <button onClick={closeCart} className="btn-ghost">
                    Continue shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {lines.map((line) => (
                    <CartLineItem
                      key={line.id}
                      line={line}
                      onUpdateQuantity={updateItem}
                      onRemove={removeItem}
                    />
                  ))}
                </ul>
              )}
            </div>

            {/* Footer with totals */}
            {lines.length > 0 && (
              <div className="border-t border-charcoal/10 p-5 space-y-4 bg-white">
                {/* Subtotal */}
                <div className="flex justify-between text-body">
                  <span className="text-muted">Subtotal ({itemCount} items)</span>
                  <span className="font-semibold">${subtotalAmount.toFixed(2)}</span>
                </div>

                {/* Free shipping threshold */}
                {subtotalAmount < 50 && (
                  <div className="bg-acid/10 rounded-button p-3 text-center text-sm">
                    Add <span className="font-semibold">${(50 - subtotalAmount).toFixed(2)}</span>{' '}
                    more for free shipping
                  </div>
                )}

                {subtotalAmount >= 50 && (
                  <div className="bg-acid/20 rounded-button p-3 text-center text-sm font-medium">
                    <span className="text-charcoal">Free shipping unlocked</span>
                  </div>
                )}

                {/* Checkout button */}
                {checkoutUrl ? (
                  <a
                    href={checkoutUrl}
                    className="btn-primary btn-full btn-primary-lg block text-center"
                    onClick={closeCart}
                  >
                    Checkout · ${subtotalAmount.toFixed(2)}
                  </a>
                ) : (
                  <Link
                    to="/checkout"
                    className="btn-primary btn-full btn-primary-lg"
                    onClick={closeCart}
                  >
                    Checkout · ${subtotalAmount.toFixed(2)}
                  </Link>
                )}

                {/* Continue shopping */}
                <button
                  onClick={closeCart}
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
  line,
  onUpdateQuantity,
  onRemove,
}: {
  line: CartLine;
  onUpdateQuantity: (lineId: string, quantity: number) => void;
  onRemove: (lineId: string) => void;
}) {
  const { id, title, variantTitle, handle, quantity, price, image } = line;
  const priceAmount = parseFloat(price.amount);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-4 bg-white rounded-card p-4"
    >
      {/* Product image */}
      {image?.url && (
        <Link to={`/ritual/${handle}`} className="flex-shrink-0">
          <img
            src={image.url}
            alt={image.altText || title}
            className="w-16 h-16 object-cover rounded-lg"
          />
        </Link>
      )}

      {/* Product info */}
      <div className="flex-1">
        <Link to={`/ritual/${handle}`}>
          <h3 className="font-semibold hover:text-charcoal/70 transition-colors">{title}</h3>
        </Link>
        {variantTitle && <p className="text-caption text-muted mt-1">{variantTitle}</p>}
        <p className="font-mono text-specs mt-2">${priceAmount.toFixed(2)}</p>
      </div>

      {/* Quantity controls */}
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center border border-charcoal/20 rounded-button">
          <button
            onClick={() => onUpdateQuantity(id, quantity - 1)}
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
            onClick={() => onUpdateQuantity(id, quantity + 1)}
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
          onClick={() => onRemove(id)}
          className="text-caption text-coral hover:text-coral/80 transition-colors"
        >
          Remove
        </button>
      </div>
    </motion.li>
  );
}
