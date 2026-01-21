/**
 * Auth Context Provider
 *
 * React context for managing customer authentication state with Shopify Storefront API.
 * Uses useFetcher for API calls and localStorage for token persistence.
 */

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { useFetcher } from '@remix-run/react';

// Storage key for persisting customer access token
const AUTH_STORAGE_KEY = 'jaylife_customer_token';

// Types
export interface Customer {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

export interface AuthState {
  customer: Customer | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => void;
  register: (email: string, password: string, firstName?: string, lastName?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

interface AuthResponse {
  customer?: Customer;
  token?: string;
  error?: string;
}

const defaultAuthState: AuthState = {
  customer: null,
  loading: true, // Start true to check for existing token
  error: null,
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<AuthState>(defaultAuthState);
  const fetcher = useFetcher<AuthResponse>();

  // Load token from localStorage and verify on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedToken = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedToken) {
      // Verify token and get customer data
      fetcher.load(`/api/auth?token=${encodeURIComponent(storedToken)}`);
    } else {
      // No token, done loading
      setAuth((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  // Handle fetcher responses
  useEffect(() => {
    if (fetcher.state === 'loading' || fetcher.state === 'submitting') {
      setAuth((prev) => ({ ...prev, loading: true, error: null }));
      return;
    }

    if (fetcher.data) {
      if (fetcher.data.error) {
        // Auth error, clear stored token
        if (typeof window !== 'undefined') {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
        setAuth({
          customer: null,
          loading: false,
          error: fetcher.data.error,
        });
        return;
      }

      if (fetcher.data.customer) {
        // Persist token if provided
        if (fetcher.data.token && typeof window !== 'undefined') {
          localStorage.setItem(AUTH_STORAGE_KEY, fetcher.data.token);
        }

        setAuth({
          customer: fetcher.data.customer,
          loading: false,
          error: null,
        });
      } else {
        setAuth((prev) => ({ ...prev, loading: false }));
      }
    }
  }, [fetcher.state, fetcher.data]);

  // Login with email and password
  const login = useCallback(
    (email: string, password: string) => {
      fetcher.submit(
        {
          action: 'login',
          email,
          password,
        },
        {
          method: 'POST',
          action: '/api/auth',
        }
      );
    },
    [fetcher]
  );

  // Register new customer
  const register = useCallback(
    (email: string, password: string, firstName?: string, lastName?: string) => {
      fetcher.submit(
        {
          action: 'register',
          email,
          password,
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
        },
        {
          method: 'POST',
          action: '/api/auth',
        }
      );
    },
    [fetcher]
  );

  // Logout
  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    setAuth({
      customer: null,
      loading: false,
      error: null,
    });
  }, []);

  const value: AuthContextValue = {
    ...auth,
    login,
    register,
    logout,
    isAuthenticated: auth.customer !== null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access auth context
 * @throws Error if used outside of AuthProvider
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * Hook to check if user is authenticated (optimized for header/nav)
 */
export function useIsAuthenticated(): boolean {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}

/**
 * Hook to get current customer data
 */
export function useCustomer(): Customer | null {
  const { customer } = useAuth();
  return customer;
}
