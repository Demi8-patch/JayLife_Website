import type { MetaFunction } from '@shopify/remix-oxygen';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Cart | Jay Life' }];
};

export default function CartPage() {
  // TODO: Integrate with cart context/state
  const cartItems: never[] = [];
  const isEmpty = cartItems.length === 0;

  if (isEmpty) {
    return (
      <div className="px-5 md:px-20 py-12 md:py-20 text-center">
        <h1 className="text-hero font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted mb-8">Add some rituals to get started.</p>
        <Link
          to="/rituals"
          className="inline-flex items-center justify-center min-h-touch px-8 bg-charcoal text-cream font-bold rounded-button"
        >
          Browse rituals
        </Link>
      </div>
    );
  }

  return (
    <div className="px-5 md:px-20 py-12 md:py-20">
      <h1 className="text-hero font-bold mb-8">Your rituals</h1>

      {/* Cart items would go here */}
      <div className="space-y-4 mb-8">
        {/* Cart line items */}
      </div>

      {/* Summary */}
      <div className="border-t border-charcoal/10 pt-6">
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold">Subtotal</span>
          <span className="font-mono text-xl">$0</span>
        </div>

        <button className="btn-primary">Checkout</button>

        <p className="text-center text-caption text-muted mt-4">
          Secure checkout via Shopify
        </p>
      </div>
    </div>
  );
}
