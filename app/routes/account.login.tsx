/**
 * Login Page
 *
 * Customer login form with email/password authentication.
 * Redirects to account page on successful login.
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from '@remix-run/react';
import { useAuth } from '~/lib/auth-context';
import { NeoLayout } from '~/components/layout/NeoLayout';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/account');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email, password);
    }
  };

  return (
    <NeoLayout>
      <div className="min-h-[70vh] flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-2">
              Welcome back
            </h1>
            <p className="text-muted">Sign in to your Jay Life account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="bg-coral/10 border border-coral/20 text-coral p-4 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-sajid"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-sajid"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="btn-primary btn-full min-h-[52px] text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
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
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-4">
            <p className="text-muted">
              Don't have an account?{' '}
              <Link
                to="/account/register"
                className="text-charcoal font-medium underline underline-offset-2 hover:text-charcoal/80 transition-colors"
              >
                Create one
              </Link>
            </p>

            <Link
              to="/account/recover"
              className="text-sm text-muted hover:text-charcoal transition-colors"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </NeoLayout>
  );
}
