import type { MetaFunction } from '@shopify/remix-oxygen';
import { Link } from '@remix-run/react';
import { useCart } from '~/lib/cart-context';
import { QuantitySelector } from '~/components/ui/QuantitySelector';
import { TrashIcon } from '~/components/ui/Icons';

export const meta: MetaFunction = () => {
  return [{ title: 'Your Bag | Jay Life' }];
};

export default function CartPage() {
  const { lines, totalQuantity, subtotal, checkoutUrl, loading, updateItem, removeItem } = useCart();
  const isEmpty = lines.length === 0;

  if (isEmpty && !loading) {
    return (
      <div className="bg-cream/30 min-h-[70vh] flex flex-col items-center justify-center px-5 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="font-display font-bold text-4xl text-charcoal mb-4">Your bag is empty</h1>
        <p className="text-charcoal/60 text-lg mb-10 max-w-sm">
          Looks like you haven't added any routines to your daily habit yet.
        </p>
        <Link
          to="/rituals"
          className="bg-charcoal text-white px-10 py-4 rounded-xl font-bold hover:bg-acid transition-colors shadow-lg"
        >
          Browse Collection
        </Link>
      </div>
    );
  }

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(parseFloat(amount));
  };

  return (
    <div className="bg-cream/30 min-h-screen py-12 md:py-20 px-5">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display font-bold text-4xl text-charcoal mb-12 text-center lg:text-left">
          Your Daily Bag {totalQuantity > 0 && <span className="text-muted">({totalQuantity})</span>}
        </h1>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            {loading && lines.length === 0 ? (
              <div className="bg-white p-6 rounded-3xl border border-charcoal/5 shadow-sm text-center py-20">
                <div className="w-8 h-8 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin mx-auto mb-4" />
                <p className="text-charcoal/40">Loading your cart...</p>
              </div>
            ) : (
              lines.map((line) => (
                <div
                  key={line.id}
                  className="bg-white p-4 md:p-6 rounded-2xl border border-charcoal/5 shadow-sm flex gap-4"
                >
                  {/* Product Image */}
                  <Link to={`/ritual/${line.handle}`} className="flex-shrink-0">
                    {line.image?.url ? (
                      <img
                        src={line.image.url}
                        alt={line.image.altText || line.title}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-cream flex items-center justify-center text-charcoal/20 font-bold text-xs">
                        {line.title}
                      </div>
                    )}
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/ritual/${line.handle}`} className="block">
                      <h3 className="font-bold text-charcoal truncate hover:text-electric-lime transition-colors">
                        {line.title}
                      </h3>
                      {line.variantTitle && (
                        <p className="text-sm text-muted">{line.variantTitle}</p>
                      )}
                    </Link>
                    <p className="font-bold text-charcoal mt-1">
                      {formatPrice(line.price.amount, line.price.currencyCode)}
                    </p>

                    {/* Quantity & Remove */}
                    <div className="flex items-center gap-4 mt-3">
                      <QuantitySelector
                        quantity={line.quantity}
                        onChange={(qty) => updateItem(line.id, qty)}
                        min={1}
                        max={99}
                        size="sm"
                      />
                      <button
                        onClick={() => removeItem(line.id)}
                        className="p-2 text-muted hover:text-coral transition-colors"
                        aria-label={`Remove ${line.title} from cart`}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl border border-charcoal/5 shadow-sm sticky top-24">
              <h2 className="font-display font-bold text-2xl text-charcoal mb-6">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-charcoal/60">
                  <span>Subtotal ({totalQuantity} items)</span>
                  <span className="font-bold text-charcoal">
                    {formatPrice(subtotal.amount, subtotal.currencyCode)}
                  </span>
                </div>
                <div className="flex justify-between text-charcoal/60">
                  <span>Shipping</span>
                  <span className="font-bold text-acid uppercase text-xs">
                    Calculated at checkout
                  </span>
                </div>
              </div>
              <div className="pt-6 border-t border-charcoal/5 mb-8">
                <div className="flex justify-between text-xl font-bold text-charcoal">
                  <span>Total</span>
                  <span>{formatPrice(subtotal.amount, subtotal.currencyCode)}</span>
                </div>
              </div>
              {checkoutUrl ? (
                <a
                  href={checkoutUrl}
                  className="block w-full bg-charcoal text-white py-4 rounded-xl font-bold hover:bg-acid transition-colors shadow-lg shadow-charcoal/5 text-center"
                >
                  Secure Checkout
                </a>
              ) : (
                <button
                  disabled
                  className="w-full bg-charcoal/50 text-white py-4 rounded-xl font-bold cursor-not-allowed"
                >
                  {loading ? 'Loading...' : 'Secure Checkout'}
                </button>
              )}
              <p className="text-center text-xs text-muted mt-4">
                Taxes calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
