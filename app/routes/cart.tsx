import type { MetaFunction } from '@shopify/remix-oxygen';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Your Bag | Jay Life' }];
};

export default function CartPage() {
  // TODO: Integrate with cart context/state
  const cartItems: never[] = [];
  const isEmpty = cartItems.length === 0;

  if (isEmpty) {
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

  return (
    <div className="bg-cream/30 min-h-screen py-12 md:py-20 px-5">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display font-bold text-4xl text-charcoal mb-12 text-center lg:text-left">
          Your Daily Bag
        </h1>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            {/* Cart items would go here */}
            <div className="bg-white p-6 rounded-3xl border border-charcoal/5 shadow-sm text-center py-20">
              <p className="text-charcoal/40">Secure checkout via Shopify</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl border border-charcoal/5 shadow-sm sticky top-24">
              <h2 className="font-display font-bold text-2xl text-charcoal mb-6">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-charcoal/60">
                  <span>Subtotal</span>
                  <span className="font-bold text-charcoal">$0.00</span>
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
                  <span>$0.00</span>
                </div>
              </div>
              <button className="w-full bg-charcoal text-white py-4 rounded-xl font-bold hover:bg-acid transition-colors shadow-lg shadow-charcoal/5">
                Secure Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
