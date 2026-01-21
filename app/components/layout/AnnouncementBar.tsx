import { useState } from 'react';

interface AnnouncementBarProps {
  message?: string;
  dismissible?: boolean;
}

export function AnnouncementBar({
  message = 'Free shipping on orders $50+ | 30-day money-back guarantee',
  dismissible = true,
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-charcoal text-white py-2 px-5 text-center text-sm relative">
      <p className="font-medium">{message}</p>
      {dismissible && (
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
          aria-label="Dismiss announcement"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
