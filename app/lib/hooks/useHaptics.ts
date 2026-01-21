import { useCallback } from 'react';

type HapticPattern = 'light' | 'medium' | 'heavy' | 'success' | 'error';

const PATTERNS: Record<HapticPattern, number | number[]> = {
  light: 10,
  medium: 25,
  heavy: 50,
  success: [10, 50, 10],
  error: [50, 100, 50],
};

/**
 * Hook for haptic feedback on mobile devices
 * Falls back gracefully on unsupported devices
 */
export function useHaptics() {
  const vibrate = useCallback((pattern: HapticPattern = 'light') => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(PATTERNS[pattern]);
    }
  }, []);

  const isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator;

  return { vibrate, isSupported };
}
