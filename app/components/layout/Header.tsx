import { Link } from '@remix-run/react';

interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  return (
    <header
      className={`sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-charcoal/5 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-20 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl tracking-tight">
          JAY LIFE
        </Link>

        {/* Desktop Nav */}
        <nav className="flex items-center gap-8">
          <Link
            to="/rituals"
            className="text-sm text-charcoal hover:text-charcoal/70 transition-colors rounded-button px-2 py-1 focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2"
          >
            Rituals
          </Link>
          <Link
            to="/learn"
            className="text-sm text-charcoal hover:text-charcoal/70 transition-colors rounded-button px-2 py-1 focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2"
          >
            Learn
          </Link>
          <Link
            to="/account"
            className="text-sm text-charcoal hover:text-charcoal/70 transition-colors rounded-button px-2 py-1 focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2"
          >
            Account
          </Link>
          <Link
            to="/cart"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-charcoal text-cream text-sm font-medium focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2"
          >
            0
          </Link>
        </nav>
      </div>
    </header>
  );
}
