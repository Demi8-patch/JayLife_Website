/**
 * Account Dashboard
 *
 * Protected page showing customer account overview.
 * Redirects to login if not authenticated.
 */

import { useEffect } from 'react';
import { useNavigate, Link } from '@remix-run/react';
import type { MetaFunction } from '@shopify/remix-oxygen';
import { useAuth } from '~/lib/auth-context';

export const meta: MetaFunction = () => {
  return [{ title: 'Account | Jay Life' }];
};

export default function AccountPage() {
  const { customer, loading, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/account/login');
    }
  }, [loading, isAuthenticated, navigate]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated || !customer) {
    return null;
  }

  const displayName = customer.firstName || customer.email.split('@')[0];

  return (
    <div className="px-5 md:px-20 py-12 md:py-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal">
              Welcome, {displayName}
            </h1>
            <p className="text-muted mt-1">{customer.email}</p>
          </div>

          <button
            onClick={logout}
            className="btn-ghost self-start md:self-auto"
          >
            Sign out
          </button>
        </div>

        {/* Dashboard Links */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/account/orders"
            className="group block bg-white p-6 rounded-2xl border border-charcoal/5 hover:border-acid hover:shadow-lg transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-acid/10 rounded-xl text-charcoal group-hover:bg-acid transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-charcoal">Order history</h2>
                <p className="text-muted text-sm mt-1">View past orders and track shipments</p>
              </div>
            </div>
          </Link>

          <Link
            to="/account/addresses"
            className="group block bg-white p-6 rounded-2xl border border-charcoal/5 hover:border-acid hover:shadow-lg transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-acid/10 rounded-xl text-charcoal group-hover:bg-acid transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-charcoal">Addresses</h2>
                <p className="text-muted text-sm mt-1">Manage your shipping addresses</p>
              </div>
            </div>
          </Link>

          <Link
            to="/rituals"
            className="group block bg-white p-6 rounded-2xl border border-charcoal/5 hover:border-acid hover:shadow-lg transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-acid/10 rounded-xl text-charcoal group-hover:bg-acid transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-charcoal">Shop rituals</h2>
                <p className="text-muted text-sm mt-1">Explore our optimization tools</p>
              </div>
            </div>
          </Link>

          <Link
            to="/account/settings"
            className="group block bg-white p-6 rounded-2xl border border-charcoal/5 hover:border-acid hover:shadow-lg transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-acid/10 rounded-xl text-charcoal group-hover:bg-acid transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-charcoal">Settings</h2>
                <p className="text-muted text-sm mt-1">Manage your account details</p>
              </div>
            </div>
          </Link>
        </div>
    </div>
  );
}
