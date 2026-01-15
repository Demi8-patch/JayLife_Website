import type { MetaFunction } from '@shopify/remix-oxygen';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Account | Jay Life' }];
};

export default function AccountPage() {
  // TODO: Integrate with Shopify Customer API
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <div className="px-5 md:px-20 py-12 md:py-20 text-center">
        <h1 className="text-hero font-bold mb-4">Welcome back</h1>
        <p className="text-muted mb-8">Sign in to manage your rituals.</p>

        <div className="max-w-sm mx-auto space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full min-h-touch px-4 bg-white border border-charcoal/10 rounded-button focus:outline-none focus:ring-2 focus:ring-acid"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full min-h-touch px-4 bg-white border border-charcoal/10 rounded-button focus:outline-none focus:ring-2 focus:ring-acid"
          />
          <button className="btn-primary">Sign in</button>
        </div>

        <p className="text-muted text-sm mt-8">
          New here?{' '}
          <Link to="/account/register" className="text-charcoal underline">
            Create account
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="px-5 md:px-20 py-12 md:py-20">
      <h1 className="text-hero font-bold mb-8">Your account</h1>

      <div className="space-y-6">
        <Link
          to="/account/orders"
          className="block bg-white p-6 rounded-card hover:shadow-card transition-shadow"
        >
          <h2 className="font-bold">Order history</h2>
          <p className="text-muted text-sm">View past orders and track shipments.</p>
        </Link>

        <Link
          to="/account/rituals"
          className="block bg-white p-6 rounded-card hover:shadow-card transition-shadow"
        >
          <h2 className="font-bold">Saved rituals</h2>
          <p className="text-muted text-sm">Your custom ritual combinations.</p>
        </Link>

        <Link
          to="/account/settings"
          className="block bg-white p-6 rounded-card hover:shadow-card transition-shadow"
        >
          <h2 className="font-bold">Settings</h2>
          <p className="text-muted text-sm">Manage your account details.</p>
        </Link>
      </div>
    </div>
  );
}
