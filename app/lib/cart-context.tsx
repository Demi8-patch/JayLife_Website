/**
 * Cart Context Provider
 *
 * React context for managing cart state with Shopify Storefront API integration.
 * Uses useFetcher for API calls and localStorage for cart ID persistence.
 */

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { useFetcher } from '@remix-run/react';
import { useHaptics } from '~/lib/hooks/useHaptics';

// Storage key for persisting cart ID
const CART_STORAGE_KEY = 'jaylife_cart_id';

// Types
export interface CartLine {
  id: string;
  merchandiseId: string;
  quantity: number;
  title: string;
  variantTitle?: string;
  handle: string;
  image?: {
    url: string;
    altText?: string;
  };
  price: {
    amount: string;
    currencyCode: string;
  };
}

export interface CartState {
  id: string | null;
  lines: CartLine[];
  totalQuantity: number;
  subtotal: {
    amount: string;
    currencyCode: string;
  };
  checkoutUrl: string | null;
  loading: boolean;
}

interface CartContextValue extends CartState {
  addItem: (merchandiseId: string, quantity?: number) => void;
  updateItem: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const defaultCartState: CartState = {
  id: null,
  lines: [],
  totalQuantity: 0,
  subtotal: {
    amount: '0.00',
    currencyCode: 'USD',
  },
  checkoutUrl: null,
  loading: false,
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartState>(defaultCartState);
  const [isOpen, setIsOpen] = useState(false);
  const fetcher = useFetcher<{ cart: CartState; error?: string }>();
  const { vibrate } = useHaptics();

  // Load cart ID from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedCartId = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCartId) {
      // Fetch existing cart
      fetcher.load(`/api/cart?cartId=${encodeURIComponent(storedCartId)}`);
    }
  }, []);

  // Handle fetcher responses
  useEffect(() => {
    if (fetcher.state === 'loading' || fetcher.state === 'submitting') {
      setCart((prev) => ({ ...prev, loading: true }));
      return;
    }

    if (fetcher.data) {
      if (fetcher.data.error) {
        // Cart not found or invalid, clear stored ID
        if (typeof window !== 'undefined') {
          localStorage.removeItem(CART_STORAGE_KEY);
        }
        setCart({ ...defaultCartState, loading: false });
        return;
      }

      if (fetcher.data.cart) {
        const newCart = fetcher.data.cart;

        // Persist cart ID
        if (newCart.id && typeof window !== 'undefined') {
          localStorage.setItem(CART_STORAGE_KEY, newCart.id);
        }

        setCart({
          ...newCart,
          loading: false,
        });
      } else {
        setCart((prev) => ({ ...prev, loading: false }));
      }
    }
  }, [fetcher.state, fetcher.data]);

  // Add item to cart
  const addItem = useCallback(
    (merchandiseId: string, quantity: number = 1) => {
      // Haptic feedback on add
      vibrate('success');

      fetcher.submit(
        {
          action: 'add',
          cartId: cart.id || '',
          merchandiseId,
          quantity: quantity.toString(),
        },
        {
          method: 'POST',
          action: '/api/cart',
        }
      );

      // Auto-open cart drawer
      setIsOpen(true);
    },
    [cart.id, fetcher, vibrate]
  );

  // Update item quantity
  const updateItem = useCallback(
    (lineId: string, quantity: number) => {
      if (!cart.id) return;

      fetcher.submit(
        {
          action: 'update',
          cartId: cart.id,
          lineId,
          quantity: quantity.toString(),
        },
        {
          method: 'POST',
          action: '/api/cart',
        }
      );
    },
    [cart.id, fetcher]
  );

  // Remove item from cart
  const removeItem = useCallback(
    (lineId: string) => {
      if (!cart.id) return;

      // Light haptic feedback on remove
      vibrate('light');

      fetcher.submit(
        {
          action: 'remove',
          cartId: cart.id,
          lineId,
        },
        {
          method: 'POST',
          action: '/api/cart',
        }
      );
    },
    [cart.id, fetcher, vibrate]
  );

  // Clear entire cart
  const clearCart = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
    setCart(defaultCartState);
    setIsOpen(false);
  }, []);

  // Cart drawer controls
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value: CartContextValue = {
    ...cart,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    isOpen,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Hook to access cart context
 * @throws Error if used outside of CartProvider
 */
export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

/**
 * Hook to get just the cart item count (optimized for header badge)
 */
export function useCartCount(): number {
  const { totalQuantity } = useCart();
  return totalQuantity;
}

/**
 * Hook to check if cart is loading
 */
export function useCartLoading(): boolean {
  const { loading } = useCart();
  return loading;
}
