/**
 * Register Page
 *
 * New customer registration form.
 * Auto-logs in after successful registration.
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from '@remix-run/react';
import { useAuth } from '~/lib/auth-context';
import { NeoLayout } from '~/components/layout/NeoLayout';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const { register, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/account');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setLocalError('Password must be at least 8 characters');
      return;
    }

    register(email, password, firstName, lastName);
  };

  const displayError = localError || error;

  return (
    <NeoLayout>
      <div className="min-h-[70vh] flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-2">
              Create account
            </h1>
            <p className="text-muted">Join Jay Life and upgrade your rituals</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {displayError && (
              <div className="bg-coral/10 border border-coral/20 text-coral p-4 rounded-xl text-sm">
                {displayError}
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-charcoal mb-2">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input-sajid"
                  placeholder="Alex"
                  autoComplete="given-name"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-charcoal mb-2">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input-sajid"
                  placeholder="Morgan"
                  autoComplete="family-name"
                />
              </div>
            </div>

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
                placeholder="At least 8 characters"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-charcoal mb-2"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-sajid"
                placeholder="Repeat your password"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !email || !password || !confirmPassword}
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
                  Creating account...
                </span>
              ) : (
                'Create account'
              )}
            </button>

            {/* Terms */}
            <p className="text-xs text-muted text-center">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="underline hover:text-charcoal">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="underline hover:text-charcoal">
                Privacy Policy
              </Link>
              .
            </p>
          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <p className="text-muted">
              Already have an account?{' '}
              <Link
                to="/account/login"
                className="text-charcoal font-medium underline underline-offset-2 hover:text-charcoal/80 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </NeoLayout>
  );
}
